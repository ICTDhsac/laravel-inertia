<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        @viteReactRefresh
        @vite('resources/js/app.jsx')
        @inertiaHead
    </head>
    <body>
        @inertia

    </body>
    <script>
        window.addEventListener('DOMContentLoaded', function() {
            console.log("DOM fully loaded and parsed");
            window.Echo.channel('testChannel')
                .listen('SystemMaintenanceEvent', (event) => {
                    console.log(event);
                });
        })
    </script>
</html>