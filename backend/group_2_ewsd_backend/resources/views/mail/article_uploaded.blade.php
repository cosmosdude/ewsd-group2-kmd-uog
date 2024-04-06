<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>New Article Uploaded</title>
</head>
<body>
    <h1>New Article Uploaded</h1>
    <p>Dear {{ $name }}</p>
    <p>A new article has been uploaded by {{ $studentname }}:</p>
    <p><b>Title: </b>{{ $contribution->name }}</p>
    <p><b>Description: </b></strong> {{ $contribution->description }}</p>
    <p><b>Submitted_Date: </b> {{ $contribution->submitted_date }}</p>
    <p>Thank you</p>
</body>
</html>
