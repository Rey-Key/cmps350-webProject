// const students = [
//     {
//         id: "20210134",
//         name: "John Doe",
//         completedCourses: ["MATH101", "PHYS201"], // Courses the student has passed
//         pendingCourses: [], // Courses the student has registered for but not yet approved
//     },
// ];

renderCourseInfo()
renderCourseDescription()
renderRegistrationDetails() 


class Section {
    constructor(id, schedule, instructor, seats) {
        this.id = id;
        this.schedule = schedule;
        this.instructor = instructor;
        this.seats = seats;
    }

    // Method to render the section as HTML
    render() {
        return `
            <div class="section">
                <h3>${this.id}</h3>
                <p><strong>Schedule:</strong> ${this.schedule}</p>
                <p><strong>Instructor:</strong> ${this.instructor}</p>
                <p><strong>Seats:</strong> ${this.seats} seats</p>
                <input type="radio" name="section" value="${this.id}">
            </div>
        `;
    }
}
const sections = [
    new Section("Section B1", "Mon/Wed 10:00-11:30 AM", "Dr. Ahmed Hassan", 23),
    new Section("Section B2", "Tue/Thu 10:00-21:30 PM", "Dr. Sarah Johnson", 15),
    new Section("Section B3", "Mon/Wed 3:00-4:30 PM", "Dr. Ahmed Hassan", 8),
];

let loggedInStudent = null;
let selectedCourse = null;



    selectedCourse.sections.forEach((section) => {
        const sectionDiv = document.createElement("div");
        sectionDiv.className = "section";
        sectionDiv.innerHTML = `
            <p><strong>Section ${section.id}</strong></p>
            <p>Schedule: ${section.schedule}</p>
            <p>Instructor: ${section.instructor}</p>
            <p>Seats Available: ${section.seats}</p>
            <button onclick="registerSection('${section.id}')">Register</button>
        `;
        sectionsList.appendChild(sectionDiv);
    });

    function renderSections() {
        const sectionsContainer = document.getElementById("sections-container");
        sectionsContainer.innerHTML = ""; // Clear previous content
    
        // Render each section
        sections.forEach((section) => {
            sectionsContainer.innerHTML += section.render();
        });
    }
    
    // Render sections when the page loads
    window.onload = function () {
        renderSections();
    };

// Register Section Function
function registerSection(sectionId) {
    if (!loggedInStudent) {
        alert("You must be logged in to register for a section.");
        return;
    }

    const section = selectedCourse.sections.find((s) => s.id === sectionId);

    if (!section) {
        alert("Section not found.");
        return;
    }

    // Check if the course is open for registration
    if (!selectedCourse.isOpen) {
        alert("This course is not open for registration.");
        return;
    }

    // Check if the student has passed all prerequisites
    const hasPrerequisites = selectedCourse.prerequisites.every((prereq) =>
        loggedInStudent.completedCourses.includes(prereq)
    );

    if (!hasPrerequisites) {
        alert("You have not completed the required prerequisites for this course.");
        return;
    }

    // Check if there are available seats
    if (section.seats <= 0) {
        alert("No seats are available for this section.");
        return;
    }

    // Register the student for the section
    section.seats--; // Reduce available seats
    loggedInStudent.pendingCourses.push({
        courseCode: selectedCourse.code,
        sectionId: section.id,
        status: "Pending Approval",
    });

    // Display success message
    alert(`Successfully registered for ${selectedCourse.name}, Section ${section.id}. Pending administrator approval.`);

    // Log the updated data
    console.log("Updated Student Information:", loggedInStudent);
    console.log("Updated Section Information:", section);

}

