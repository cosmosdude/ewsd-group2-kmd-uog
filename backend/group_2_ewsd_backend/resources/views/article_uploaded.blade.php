<!DOCTYPE html>
<html>
<head>
    <title>{{ $subject }}</title>
</head>
<body>
    <h1>{{ $subject }}</h1>
    <p>{{ $content }}</p>

    <p>File: <a href="{{ $uploadedFiles }}"></a></p>
    <p>Image: <img src="{{ $uploadedImages }}"></p>
</body>
</html>
