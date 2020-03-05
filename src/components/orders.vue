<div>
    <style>

    table {
        border: 1px solid #aa;
        width: 100%;
    }

    td {
        background: #f00;
        border: 1px solid #eee;
        padding: 8px;
    }
    </style>
    <table>
    <tr v-for="order in orders">
        <td>{{order.id}}</td>
        <td>{{order.name}}</td>
    </tr>
    </table>
</div>
