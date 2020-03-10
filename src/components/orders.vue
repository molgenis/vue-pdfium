<html>
    <head>
        <link rel="stylesheet" href="http://localhost:3000/static/styles.css">
    </head>
    <body>
        <img src="http://localhost:3000/static/logo.png" width="234" height="45">
        <h1>Order details</h1>
        <ul>
            <li><div>Order number</div> {{order.orderNumber}}</li>
            <li v-if="order.name"><div>Name</div>{{order.name}}</li>
            <li><div>Email</div> {{order.email}}</li>
            <li><div>User</div> {{order.user}}</li>
        </ul>


        <h1>Variables</h1>
        <table>

        <div v-for="section in cartTree">
            <h2>{{section.name}}</h2>
            <div v-for="subsection in section.subsections">
                <h3>{{subsection.name}}</h3>
                <div class="variables" v-for="variable in subsection.variables">
                    <div class="variable">{{variable.label||variable.name}}</div>
                    <div class="assessments">{{ variableAssessments[variable.id] }}</div>
                </div>
            </div>
        </div>
        </table>
    </body>
</html>
