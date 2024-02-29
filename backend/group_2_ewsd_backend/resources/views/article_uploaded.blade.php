<!DOCTYPE html>
<html>
<head>
    <title>New Article Uploaded</title>
</head>
<body>
    <h1>New Article Uploaded</h1>
    <p>Dear Coordinator,</p>

    <p>A new article has been uploaded by {{ $studentName }}:</p>

    <p><strong>Title:</strong> {{ $articleTitle }}</p>

    <p>Please review it at your earliest convenience.</p>

    <p>Thank you,</p>
    <p>{{ config('app.name') }}</p>
</body>
</html>
