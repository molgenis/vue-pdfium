export default () => {

    return {
        created: function() {
            const variableAssessments = {}
            const gridSelection = Object.entries(this.gridSelection)

            for (const [variableId, assessmentIds] of gridSelection) {
                const assessmentNames = assessmentIds.map(assessmentId => this.assessments[assessmentId].name)
                variableAssessments[variableId] = assessmentNames.sort().join(' ')
            }

            this.variableAssessments = variableAssessments
        },
        data: function() {
            return {
                variableAssessments: {},
            }
        },
        store: ['assessments', 'cartTree', 'filters', 'gridSelection', 'order', 'pdfium'],
    }
}