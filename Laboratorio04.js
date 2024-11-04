class Student {
    constructor({ name, surname, email }) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.courses = [];
    }

    addCourse(course, level) {
        this.courses.push({ course, level });
    }
}

class Teacher {
    constructor({ name, surname, email }) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.courses = [];
    }

    addCourse(course, level) {
        this.courses.push({ course, level });
    }

    editCourse(course, level) {
        const courseIndex = this.courses.findIndex(c => c.course === course);
        if (courseIndex !== -1) {
            this.courses[courseIndex].level = level;
        }
    }
}

// Clase ExtendedUser con el método match
class ExtendedUser {
    static match(teacher, student, courseName = null) {
        if (courseName) {
            const teacherCourse = teacher.courses.find(c => c.course === courseName);
            const studentCourse = student.courses.find(c => c.course === courseName);

            if (teacherCourse && studentCourse && teacherCourse.level >= studentCourse.level) {
                return { course: courseName, level: studentCourse.level };
            }
            return undefined;
        } else {
            const matches = student.courses
                .filter(studentCourse => {
                    const teacherCourse = teacher.courses.find(
                        tCourse => tCourse.course === studentCourse.course && tCourse.level >= studentCourse.level
                    );
                    return teacherCourse !== undefined;
                })
                .map(studentCourse => ({
                    course: studentCourse.course,
                    level: studentCourse.level
                }));

            return matches.length > 0 ? matches : [];
        }
    }
}

// Clase Tutoring con los métodos requeridos
class Tutoring {
    constructor() {
        this.students = [];
        this.teachers = [];
    }

    addStudent(name, surname, email) {
        const student = new Student({ name, surname, email });
        this.students.push(student);
    }

    addTeacher(name, surname, email) {
        const teacher = new Teacher({ name, surname, email });
        this.teachers.push(teacher);
    }

    getStudentByName(name, surname) {
        return this.students.find(student => student.name === name && student.surname === surname);
    }

    getTeacherByName(name, surname) {
        return this.teachers.find(teacher => teacher.name === name && teacher.surname === surname);
    }

    getTeacherForStudent(student) {
        return this.teachers.filter(teacher => {
            const match = ExtendedUser.match(teacher, student);
            return match.length > 0;
        });
    }

    getStudentsForTeacher(teacher) {
        return this.students.filter(student => {
            const match = ExtendedUser.match(teacher, student);
            return match.length > 0;
        });
    }
}

// Código de prueba
let tutoring = new Tutoring();
tutoring.addStudent('Rafael', 'Fife', 'rfife@rhyta.com');
tutoring.addStudent('Kelly', 'Estes', 'k_estes@dayrep.com');
tutoring.addTeacher('Paula', 'Thompkins', 'PaulaThompkins@jourrapide.com');

let student = tutoring.getStudentByName('Rafael', 'Fife');
student.addCourse('maths', 2);
student.addCourse('physics', 4);

let teacher = tutoring.getTeacherByName('Paula', 'Thompkins');
teacher.addCourse('maths', 4);

let students = tutoring.getTeacherForStudent(student);
let teachers = tutoring.getStudentsForTeacher(teacher);
console.log(students[0]); // -> Teacher {name: 'Paula', surname: 'Thompkins', ...}
console.log(teachers[0]); // -> Student {name: 'Rafael', surname: 'Fife', ...}

student = tutoring.getStudentByName('Kelly', 'Estes');
students = tutoring.getTeacherForStudent(student);
teachers = tutoring.getStudentsForTeacher(teacher);
console.log(students[0]); // -> undefined
console.log(teachers[0]); // -> Student {name: 'Rafael', surname: 'Fife', ...}
