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

        <script>
            window.addEventListener('DOMContentLoaded', function() {
                window.Echo.channel('system-maintenance')
                    .listen('SystemMaintenanceEvent', (event) => {
                        console.log(event);
                    });
            })
        </script>
    </body>
</html>