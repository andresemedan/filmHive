
  function addRole() {
    // Selecting the rolesContainer
    let rolesContainer = document.getElementById('rolesContainer');

    // Creating a roleDiv in order to hold the roles and description. 
    let roleDiv = document.createElement('div');

    // Role dropdown
    let roleDropdown = document.createElement('select');
    roleDropdown.name = 'rolesWanted'; 
    roleDropdown.id = 'rolesWanted';
    roleDropdown.innerHTML = `
      <option value="actor">Actor</option>
      <option value="writer">Writer</option>
      <option value="cinematographer">Cinematographer</option>
      <option value="director">Director</option>
    `;
    roleDiv.appendChild(roleDropdown);

    // Role description
    let descriptionInput = document.createElement('textarea');
    descriptionInput.type = 'text';
    descriptionInput.className = 'form-control mt-2';
    descriptionInput.name = 'rolesDescription'; 
    descriptionInput.id = 'rolesDescription';
    descriptionInput.placeholder = 'Role Description';
    roleDiv.appendChild(descriptionInput);

    let deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'btn btn-secondary btn-delete dynamic-btn mt-2'
    deleteButton.innerHTML = 'Delete Role';
    deleteButton.onclick = function() {
      rolesContainer.removeChild(roleDiv);
    };
    roleDiv.appendChild(deleteButton);

    // Append the roleDiv to the container
    rolesContainer.appendChild(roleDiv);
  }

  function deleteRoll () {

  }