<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>New Commented in Contribution</title>
</head>
<body>
    <h1>New Comment on Contribution</h1>
    <p>Hello {{ $commentername }},</p>
    <p>A new comment has been added to your contribution:</p>
    <p><strong>Title:</strong> {{ $contribution->title }}</p>
    <p><strong>Comment:</strong> {{ $comment }}</p>
    <p>Thank you,</p>
</body>
</html>
