<html>
    <head>
        <link rel="stylesheet" :href="`http://localhost:${pdfium.port}/static/styles.css`">
    </head>
    <body>
        <img class="logo" :src="`http://localhost:${pdfium.port}/static/logo.png`" width="234" height="45">
        <div class="order">
            <h1>Order details</h1>
            <div class="order-line">
                <div class="name">Order number</div>
                <div class="value">{{order.orderNumber}}</div>
            </div>

            <div class="order-line">
                <div class="name">Status</div>
                <div class="value">{{order.state}}</div>
            </div>

            <div class="order-line">
                <div class="name">Request id</div>
                <div class="value">{{order.requestId}}</div>
            </div>

            <div class="order-line">
                <div class="name">Creation date</div>
                <div class="value">{{new Date(order.creationDate).toLocaleDateString()}}</div>
            </div>

            <div class="order-line">
                <div class="name">Last update</div>
                <div class="value" v-if="order.updateDate">{{new Date(order.updateDate).toLocaleDateString()}}</div>
                <div class="value" v-else>-</div>
            </div>

            <div class="order-line">
                <div class="name">Submission date</div>
                <div class="value" v-if="order.submissionDate">{{new Date(order.submissionDate).toLocaleDateString()}}</div>
                <div class="value" v-else>-</div>
            </div>

            <div class="order-line">
                <div class="name">Project number</div>
                <div class="value">{{order.projectNumber}}</div>
            </div>

            <div class="order-line">
                <div class="name">Application form</div>
                <div class="value" v-if="order.applicationForm">{{order.applicationForm.filename}}</div>
                <div class="value" v-else>-</div>
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

        <div class="filters">
            <h1>Selection criteria</h1>
            <div class="filter-line">
                <div class="name">assessment</div>
                <div class="value">
                    <span v-for="id in filters.assessment">{{assessments[id].name}} </span>
                </div>
            </div>
            <div class="filter-line">
                <div class="name">hideZeroData</div>
                <div class="value">{{filters.hideZeroData}}</div>
            </div>
            <div class="filter-line">
                <div class="name">gender</div>
                <div class="value" v-if="filters.gender">{{filters.gender.join(' ')}}</div>
                <div class="value" v-else>-</div>
            </div>
            <div class="filter-line">
                <div class="name">subcohort</div>
                <div class="value" v-if="filters.subcohort">{{filters.subcohort.join(' ')}}</div>
                <div class="value" v-else>-</div>
            </div>
            <div class="filter-line">
                <div class="name">ageGroupAt1A</div>
                <div class="value" v-if="filters.ageGroupAt1A">{{filters.ageGroupAt1A.join(' ')}}</div>
                <div class="value" v-else>-</div>
            </div>
            <div class="filter-line">
                <div class="name">ageGroupAt2A</div>
                <div class="value" v-if="filters.ageGroupAt2A">{{filters.ageGroupAt2A.join(' ')}}</div>
                <div class="value" v-else>-</div>
            </div>
            <div class="filter-line">
                <div class="name">ageGroupAt3A</div>
                <div class="value" v-if="filters.ageGroupAt3A">{{filters.ageGroupAt3A.join(' ')}}</div>
                <div class="value" v-else>-</div>
            </div>
            <div class="filter-line">
                <div class="name">yearOfBirthRange</div>
                <div class="value" v-if="filters.yearOfBirthRange">{{filters.yearOfBirthRange.join(' ')}}</div>
                <div class="value" v-else>-</div>
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
