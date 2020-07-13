<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>クルマモリ9</title>
        <link rel="stylesheet" href="/css/app.css">
        <link rel="stylesheet" href="/css/flexslider.css">
        <link rel="stylesheet" href="/css/font-icon.css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.0.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
            integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <script src="https://code.jquery.com/jquery-3.4.1.min.js"
            integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
            integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous">
        </script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
            integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous">
        </script>

        {{-- 날짜관련 js, css --}}
        <script src="/js/bootstrap-datepicker.js"></script>
        <link rel="stylesheet" href="/css/bootstrap-datepicker.css">
        <meta name="description" content="{{ config('project.description') }}">

        {{-- canvas.js --}}
        <script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>

        {{-- 애니메이션 --}}
        {{-- <script src="/js/aos.js"></script> --}}
        {{-- <link rel="stylesheet" href="/css/aos.css"> --}}
        {{-- react scroll animation --}}
        <link rel="stylesheet" href="/css/animate.min.css">

        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">

    </head>
    <body>
        <div id="app"></div>
        <script src="/js/app.js"></script>
        <link rel="stylesheet" href="/css/jang.css">
    </body>
</html>