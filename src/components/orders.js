export default () => {
    return {
        computed: {
            variableAssessments() {
                let variableAssesmentsStings = {}
                for (const [variableId, assessmentIds] of Object.entries(this.gridSelection)) {
                    const assessmentNames = assessmentIds.map(assessmentId => this.assessments[assessmentId].name)
                    variableAssesmentsStings[variableId] = assessmentNames.sort().join(' ')
                }

                return variableAssesmentsStings
            },
        },
        store: ['assessments', 'cartTree', 'filters', 'gridSelection', 'order'],
    }
}