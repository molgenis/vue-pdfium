<html>
    <head>
        <link rel="stylesheet" href="http://localhost:3000/static/styles.css">

    </head>
    <body>
        <img src="http://localhost:3000/static/logo.png" width="234" height="45">
        <h1>Order details</h1>
        <table>
        <div v-for="section in state">
            <h2>{{section.name}}</h2>

            <table v-for="subsection in section.subsections">
                <h3>{{subsection.name}}</h3>
                <div v-for="variable in subsection.variables">
                {{variable.label}}
                </div>
            </table>
        </div>
        </table>
    </body>
</html>
