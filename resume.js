document.addEventListener('DOMContentLoaded', function() {
            // Elements
            const generateBtn = document.getElementById('generate-resume');
            const resetBtn = document.getElementById('reset-form');
            const addExperienceBtn = document.getElementById('add-experience');
            const addEducationBtn = document.getElementById('add-education');
            const experienceContainer = document.getElementById('experience-container');
            const educationContainer = document.getElementById('education-container');
            const resumeForm = document.getElementById('resume-form');
            const resumePreview = document.getElementById('resume-preview');
            const printButton = document.getElementById('print-button');
            const backToEditButton = document.getElementById('back-to-edit');
            
            // Add initial experience and education fields
            addExperienceField();
            addEducationField();
            
            // Event Listeners
            addExperienceBtn.addEventListener('click', addExperienceField);
            addEducationBtn.addEventListener('click', addEducationField);
            generateBtn.addEventListener('click', generateResume);
            resetBtn.addEventListener('click', resetForm);
            printButton.addEventListener('click', printResume);
            backToEditButton.addEventListener('click', backToEdit);
            
            // Functions
            function addExperienceField() {
                const experienceIndex = document.querySelectorAll('.experience-field').length;
                
                const experienceField = document.createElement('div');
                experienceField.className = 'experience-field';
                experienceField.innerHTML = `
                    <div class="form-group">
                        <label for="jobTitle-${experienceIndex}">Job Title</label>
                        <input type="text" id="jobTitle-${experienceIndex}" placeholder="Software Developer">
                    </div>
                    <div class="form-group">
                        <label for="company-${experienceIndex}">Company</label>
                        <input type="text" id="company-${experienceIndex}" placeholder="Tech Company Inc.">
                    </div>
                    <div class="form-group">
                        <label for="location-${experienceIndex}">Location</label>
                        <input type="text" id="location-${experienceIndex}" placeholder="City, State">
                    </div>
                    <div class="form-group">
                        <label for="startDate-${experienceIndex}">Start Date</label>
                        <input type="text" id="startDate-${experienceIndex}" placeholder="January 2020">
                    </div>
                    <div class="form-group">
                        <label for="endDate-${experienceIndex}">End Date</label>
                        <input type="text" id="endDate-${experienceIndex}" placeholder="Present">
                    </div>
                    <div class="form-group">
                        <label for="description-${experienceIndex}">Description</label>
                        <textarea id="description-${experienceIndex}" placeholder="Describe your responsibilities and achievements..."></textarea>
                    </div>
                `;
                
                if (experienceIndex > 0) {
                    const removeBtn = document.createElement('button');
                    removeBtn.type = 'button';
                    removeBtn.className = 'remove-btn';
                    removeBtn.textContent = 'Remove';
                    removeBtn.addEventListener('click', function() {
                        experienceField.remove();
                    });
                    experienceField.appendChild(removeBtn);
                }
                
                experienceContainer.appendChild(experienceField);
            }
            
            function addEducationField() {
                const educationIndex = document.querySelectorAll('.education-field').length;
                
                const educationField = document.createElement('div');
                educationField.className = 'education-field';
                educationField.innerHTML = `
                    <div class="form-group">
                        <label for="degree-${educationIndex}">Degree</label>
                        <input type="text" id="degree-${educationIndex}" placeholder="Bachelor of Science in Computer Science">
                    </div>
                    <div class="form-group">
                        <label for="institution-${educationIndex}">Institution</label>
                        <input type="text" id="institution-${educationIndex}" placeholder="University Name">
                    </div>
                    <div class="form-group">
                        <label for="eduLocation-${educationIndex}">Location</label>
                        <input type="text" id="eduLocation-${educationIndex}" placeholder="City, State">
                    </div>
                    <div class="form-group">
                        <label for="graduationDate-${educationIndex}">Graduation Date</label>
                        <input type="text" id="graduationDate-${educationIndex}" placeholder="May 2019">
                    </div>
                `;
                
                if (educationIndex > 0) {
                    const removeBtn = document.createElement('button');
                    removeBtn.type = 'button';
                    removeBtn.className = 'remove-btn';
                    removeBtn.textContent = 'Remove';
                    removeBtn.addEventListener('click', function() {
                        educationField.remove();
                    });
                    educationField.appendChild(removeBtn);
                }
                
                educationContainer.appendChild(educationField);
            }
            
            function generateResume() {
                // Get personal info
                const fullName = document.getElementById('fullName').value || 'Your Name';
                const email = document.getElementById('email').value || 'your.email@example.com';
                const phone = document.getElementById('phone').value || '(123) 456-7890';
                const location = document.getElementById('location').value || 'City, State';
                const summary = document.getElementById('summary').value || 'Professional summary not provided.';
                
                // Get work experience
                const experienceFields = document.querySelectorAll('.experience-field');
                let experienceHTML = '';
                
                experienceFields.forEach((field, index) => {
                    const jobTitle = document.getElementById(`jobTitle-${index}`).value || 'Job Title';
                    const company = document.getElementById(`company-${index}`).value || 'Company';
                    const loc = document.getElementById(`location-${index}`).value || 'Location';
                    const startDate = document.getElementById(`startDate-${index}`).value || 'Start Date';
                    const endDate = document.getElementById(`endDate-${index}`).value || 'Present';
                    const description = document.getElementById(`description-${index}`).value || 'Job description not provided.';
                    
                    experienceHTML += `
                        <div class="experience-item">
                            <div class="experience-header">
                                <div class="company-name">${company}</div>
                                <div class="date">${startDate} - ${endDate}</div>
                            </div>
                            <div class="job-title">${jobTitle} | ${loc}</div>
                            <div class="description">${description}</div>
                        </div>
                    `;
                });
                
                // Get education
                const educationFields = document.querySelectorAll('.education-field');
                let educationHTML = '';
                
                educationFields.forEach((field, index) => {
                    const degree = document.getElementById(`degree-${index}`).value || 'Degree';
                    const institution = document.getElementById(`institution-${index}`).value || 'Institution';
                    const eduLoc = document.getElementById(`eduLocation-${index}`).value || 'Location';
                    const graduationDate = document.getElementById(`graduationDate-${index}`).value || 'Graduation Date';
                    
                    educationHTML += `
                        <div class="education-item">
                            <div class="education-header">
                                <div class="institution-name">${institution}</div>
                                <div class="date">${graduationDate}</div>
                            </div>
                            <div class="degree-name">${degree} | ${eduLoc}</div>
                        </div>
                    `;
                });
                
                // Get skills
                const skillsInput = document.getElementById('skills').value;
                const skills = skillsInput ? skillsInput.split(',').map(skill => skill.trim()) : [];
                
                let skillsHTML = '';
                if (skills.length > 0) {
                    skillsHTML = `
                        <div class="skills-list">
                            ${skills.map(skill => `<div class="skill-item">${skill}</div>`).join('')}
                        </div>
                    `;
                } else {
                    skillsHTML = '<p>No skills provided.</p>';
                }
                
                // Generate resume HTML
                const resumeHTML = `
                    <div class="resume-header">
                        <h2>${fullName}</h2>
                    </div>
                    <div class="resume-contact">
                        ${email} | ${phone} | ${location}
                    </div>
                    <div class="resume-section">
                        <h3>Professional Summary</h3>
                        <p>${summary}</p>
                    </div>
                    <div class="resume-section">
                        <h3>Work Experience</h3>
                        ${experienceHTML || '<p>No work experience provided.</p>'}
                    </div>
                    <div class="resume-section">
                        <h3>Education</h3>
                        ${educationHTML || '<p>No education provided.</p>'}
                    </div>
                    <div class="resume-section">
                        <h3>Skills</h3>
                        ${skillsHTML}
                    </div>
                `;
                
                // Show resume preview
                resumePreview.innerHTML = resumeHTML;
                resumeForm.classList.add('hidden');
                resumePreview.classList.remove('hidden');
                printButton.classList.remove('hidden');
                backToEditButton.classList.remove('hidden');
            }
            
            function resetForm() {
                const confirmReset = confirm('Are you sure you want to reset all form data?');
                if (confirmReset) {
                    // Clear all input fields
                    document.querySelectorAll('input, textarea').forEach(input => {
                        input.value = '';
                    });
                    
                    // Remove all experience and education fields except the first one
                    while (experienceContainer.children.length > 1) {
                        experienceContainer.removeChild(experienceContainer.lastChild);
                    }
                    
                    while (educationContainer.children.length > 1) {
                        educationContainer.removeChild(educationContainer.lastChild);
                    }
                }
            }
            
            function printResume() {
                window.print();
            }
            
            function backToEdit() {
                resumeForm.classList.remove('hidden');
                resumePreview.classList.add('hidden');
                printButton.classList.add('hidden');
                backToEditButton.classList.add('hidden');
            }
        });
