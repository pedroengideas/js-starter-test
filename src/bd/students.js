export default function Students() {
    'strict';
    let items = [
        {
            'id':1, 'name': 'Julio Rodriguez', 'mail': 'julio@emailna.co', 'age': '30',
            'courses': [
                1, 2

            ]
        },
        {
            'id':2, 'name': 'Felix Tovar', 'mail': 'felix@emailna.co', 'age': '30',
            'courses': [
                1, 4
            ]
        },
        {
            'id':3, 'name': 'Rosmy Rodríguez', 'mail': 'rosmy@emailna.co', 'age': '30',
            'courses': [
                2, 5
            ]
        },
        {
            'id':4, 'name': 'Jean Contreras', 'mail': 'jean@emailna.co', 'age': '30',
            'courses': [4, 5]
        }

    ];

    Object.defineProperty(this, 'items', {'get': () => items});
}

