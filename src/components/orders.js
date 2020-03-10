export default (app) => {
    return {
        computed: {
            variableAssessments() {
                let variableAssesmentsStings = {}
                for (const [variableId, assessmentIds] of Object.entries(this.gridSelection)) {
                    const assessmentNames = assessmentIds.map(assessmentId => this.assessments[assessmentId].name)
                    variableAssesmentsStings[variableId] = assessmentNames.join(' ')
                }

                return variableAssesmentsStings
            },
        },
        store: ['assessments', 'cartTree', 'gridSelection', 'order'],
    }
}