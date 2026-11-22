<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

const MAIL_TO = 'info@accuratepestcontrol.ae';
const MAIL_FROM = 'info@accuratepestcontrol.ae';
const MAIL_FROM_NAME = 'Accurate Pest Control Website';

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

/**
 * @param array<string, mixed> $payload
 */
function respond(array $payload, int $status = 200): void
{
    http_response_code($status);
    echo json_encode($payload);
    exit;
}

$honey = trim((string) ($_POST['_honey'] ?? ''));
if ($honey !== '') {
    // Bot filled honeypot — pretend success, do not send.
    respond(['ok' => true, 'message' => 'Thanks']);
}

$skipKeys = ['_honey', '_captcha', '_subject', '_replyto', '_template', '_next', '_cc', '_blacklist', '_autoresponse'];
$fields = [];

foreach ($_POST as $key => $value) {
    $name = trim((string) $key);
    if ($name === '' || in_array($name, $skipKeys, true)) {
        continue;
    }

    if (is_array($value)) {
        $value = implode(', ', array_map(static fn ($item) => trim((string) $item), $value));
    } else {
        $value = trim((string) $value);
    }

    if ($value === '') {
        continue;
    }

    $fields[$name] = $value;
}

$hasFile = false;
foreach ($_FILES as $file) {
    if (!is_array($file)) {
        continue;
    }

    $error = $file['error'] ?? UPLOAD_ERR_NO_FILE;
    if ($error === UPLOAD_ERR_NO_FILE) {
        continue;
    }

    if ($error !== UPLOAD_ERR_OK) {
        respond(['ok' => false, 'error' => 'File upload failed'], 400);
    }

    $size = (int) ($file['size'] ?? 0);
    if ($size <= 0 || $size > 10 * 1024 * 1024) {
        respond(['ok' => false, 'error' => 'File must be 10 MB or smaller'], 400);
    }

    $hasFile = true;
}

if ($fields === [] && !$hasFile) {
    respond(['ok' => false, 'error' => 'Empty form'], 400);
}

$subject = trim((string) ($_POST['_subject'] ?? 'Website Form Submission'));
if ($subject === '') {
    $subject = 'Website Form Submission';
}
$subject = preg_replace('/[\r\n]+/', ' ', $subject) ?? $subject;

$replyTo = '';
foreach (['Email', 'Email Address', 'E-mail', 'email', 'Email_Address'] as $emailKey) {
    if (!empty($fields[$emailKey]) && filter_var($fields[$emailKey], FILTER_VALIDATE_EMAIL)) {
        $replyTo = $fields[$emailKey];
        break;
    }
}

$lines = ["New website form submission", str_repeat('-', 40), ''];
foreach ($fields as $label => $value) {
    $lines[] = $label . ': ' . $value;
}

if ($hasFile) {
    $lines[] = '';
    $lines[] = 'Attachments:';
    foreach ($_FILES as $key => $file) {
        if (!is_array($file) || ($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
            continue;
        }
        $lines[] = '- ' . $key . ': ' . basename((string) $file['name']);
    }
}

$bodyText = implode("\n", $lines);
$boundary = 'bnd_' . bin2hex(random_bytes(12));

$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'From: ' . sprintf('"%s" <%s>', MAIL_FROM_NAME, MAIL_FROM);
$headers[] = 'Reply-To: ' . ($replyTo !== '' ? $replyTo : MAIL_FROM);
$headers[] = 'X-Mailer: AccuratePestControl-SendMail';
$headers[] = 'Content-Type: multipart/mixed; boundary="' . $boundary . '"';

$message = '--' . $boundary . "\r\n";
$message .= "Content-Type: text/plain; charset=UTF-8\r\n";
$message .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
$message .= $bodyText . "\r\n";

foreach ($_FILES as $file) {
    if (!is_array($file) || ($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
        continue;
    }

    $tmp = (string) ($file['tmp_name'] ?? '');
    $filename = basename((string) ($file['name'] ?? 'attachment'));
    $type = (string) ($file['type'] ?? 'application/octet-stream');
    if ($tmp === '' || !is_uploaded_file($tmp)) {
        continue;
    }

    $data = file_get_contents($tmp);
    if ($data === false) {
        continue;
    }

    $message .= '--' . $boundary . "\r\n";
    $message .= 'Content-Type: ' . $type . '; name="' . $filename . "\"\r\n";
    $message .= "Content-Transfer-Encoding: base64\r\n";
    $message .= 'Content-Disposition: attachment; filename="' . $filename . "\"\r\n\r\n";
    $message .= chunk_split(base64_encode($data)) . "\r\n";
}

$message .= '--' . $boundary . "--\r\n";

$sent = @mail(MAIL_TO, '=?UTF-8?B?' . base64_encode($subject) . '?=', $message, implode("\r\n", $headers));

if (!$sent) {
    respond(['ok' => false, 'error' => 'Unable to send email'], 500);
}

respond(['ok' => true, 'message' => 'Thanks']);
