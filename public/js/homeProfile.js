// Script to have the homeProfile-- profile pic input form, submit once a file is chosen. -- this way we don't have to hit the submit button. 

// Listens for changes in the file input field
document.getElementById('profilePicUpload').addEventListener('change', function() {
    // Submit the form when a file is selected
    document.getElementById('profilePicForm').submit();
  })

  