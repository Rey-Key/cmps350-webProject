
renderCourseInfo()
renderCourseDescription()
renderRegistrationDetails() 

const sections = [
   
];

class Section {
    constructor( id,schedule,instructor,seats,availableSeats,deadline,location,status) {
            this.id = id;
            this.schedule = schedule;
            this.instructor = instructor;
            this.seats = seats;
            this.availableSeats = availableSeats;
            this.deadline = deadline;
            this.location = location;
            this.status = status;
        }
    
        // Method to render the section as HTML
        render() {
            return `
                <div class="section">
                    <h3>${this.id}</h3>
                    <p><strong>Schedule:</strong> ${this.schedule}</p>
                    <p><strong>Instructor:</strong> ${this.instructor}</p>
                    <p><strong>Seats:</strong> ${this.availableSeats} of ${this.seats} seats remaining</p>
                    <p><strong>Deadline:</strong> ${this.deadline}</p>
                    <p><strong>Location:</strong> ${this.location}</p>
                    <p><strong>Status:</strong> ${this.status}</p>
                    <input type="radio" name="section" value="${this.id}">
                </div>
            `;
        }

            // Method to render the registration details section
    renderRegistrationDetails() {
        return `
            <div class="registration-details">
                <h2>Registration Details</h2>
                <ul>
                    <li>
                        <label>Prerequisites - ${this.prerequisites.length ? this.prerequisites.join(", ") : "None - You meet all requirements"}</label>
                    </li>
                    <li>
                        <label>Available Seats - ${this.availableSeats} of ${this.seats} seats remaining</label>
                    </li>
                    <li>
                        <label>Registration Deadline - ${this.deadline}</label>
                    </li>
                </ul>
            </div>
        `;
    }
}


let loggedInStudent = null;
let selectedCourse = null;

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

