import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { renderProject } from '../src/renderer';
import { exampleProject } from '../src/example-project';

const targetDir = path.resolve(__dirname, '../dist-sample');
mkdirSync(targetDir, { recursive: true });
renderProject(exampleProject, targetDir);

writeFileSync(path.join(targetDir, 'contact_form.php'), `<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo 'Method not allowed';
  exit;
}

$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$message = trim($_POST['message'] ?? '');

if (!$name || !$email || !$message) {
  http_response_code(400);
  echo 'Missing required fields';
  exit;
}

$to = 'hello@lepetitbistrot.example';
$subject = 'Nouveau message du site';
$body = "Nom: $name\nEmail: $email\n\nMessage:\n$message";
$headers = "From: website@example.com\r\nReply-To: $email\r\n";

mail($to, $subject, $body, $headers);
echo 'OK';
`);

console.log(`Sample project generated to: ${targetDir}`);
