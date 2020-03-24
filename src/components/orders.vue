<html>
    <head>
        <link rel="stylesheet" href="http://localhost:3000/static/styles.css">
    </head>
    <body>
        <img class="logo" src="http://localhost:3000/static/logo.png" width="234" height="45">

        <div class="order">
            <h1>Order details</h1>
            <div class="order-line">
                <div class="name">Order number</div>
                <div class="value">{{order.orderNumber}}</div>
            </div>

            <div class="order-line" v-if="order.name">
                <div class="name">Name</div>
                <div class="value">{{order.name}}</div>
            </div>

            <div class="order-line">
                <div class="name">Email</div>
                <div class="value">{{order.email}}</div>
            </div>

            <div class="order-line">
                <div class="name">User</div>
                <div class="value">{{order.user}}</div>
            </div>
        </div>

        <div v-if="filters && Object.keys(filters).length" class="filters">
            <h1>Selection criteria</h1>
            <div class="filter-line" v-for="filter, name in filters">
                <div class="name">{{name}}</div>
                <div class="value" v-if="Array.isArray(filter)">{{filter.join(' ')}}</div>
                <div class="value" v-else>{{filter}}</div>
            </div>
        </div>

        <div class="variables">
            <h1>Variables</h1>
            <div class="section" v-for="section in cartTree">
                <h2>{{section.name}}</h2>
                <div class="subsection" v-for="subsection in section.subsections">
                    <h3>{{subsection.name}}</h3>
                    <div class="variable-line" v-for="variable in subsection.variables">
                        <div class="name">{{variable.label||variable.name}}</div>
                        <div class="value">{{ variableAssessments[variable.id] }}</div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>
