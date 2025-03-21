class Course {
    constructor(code, name, category, credits, instructor, description,prerequisites) {
        this.code = code;
        this.name = name;
        this.category = category;
        this.credits = credits;
        this.instructor = instructor;
        this.description = description;
        this.prerequisites = prerequisites;
    }

    // Method to render the course info section
    renderCourseInfo() {
        return `
            <div class="course-info">
                <img src="" alt="">
                <h2>${this.code}</h2>
                <p>${this.name}</p>
                <p><strong>Category:</strong> ${this.category}</p>
                <p><strong>Credits:</strong> ${this.credits}</p>
                <p><strong>Instructor:</strong> ${this.instructor}</p>
            </div>
        `;
    }

    // Method to render the course description section
    renderCourseDescription() {
        return `
            <div class="course-description">
                <h2>Course Description</h2>
                <p>${this.description}</p>
            </div>
        `;
    }


}