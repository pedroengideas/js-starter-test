export function Courses() {
    'strict';

    let courses = [
        {"id": 1, "name": "Javascript", "days": ["Monday", "Wednesday"]},
        {"id": 2, "name": "PHP Advanced Topics", "days": ["Tuesday", "Thursday"]},
        {"id": 3, "name": "NoSQL", "days": ["Monday", "Friday"]},
        {"id": 4, "name": "UX Experts", "days": ["Tuesday", "Friday"]},
        {"id": 5, "name": "Design patterns", "days": ["Saturday"]},
    ];

    Object.defineProperty(this, 'items', {'get': () => courses});

}

export default Courses;