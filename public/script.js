const ideaForm = document.getElementById('ideaForm');
const ideasWall = document.getElementById('ideasWall'); 
const ideasWallContent = document.getElementById('ideasWallContent');

ideaForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const contributor = document.getElementById('contributor').value;
  const email = document.getElementById('email').value;
  const tags = document.getElementById('tags').value;

  const idea = { title, description, contributor, email, tags };

  const response = await fetch('/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(idea),
  });

  if (response.ok) {
    fetchIdeas();
    ideaForm.reset();
  } else {
    alert('Error submitting idea.');
  }
});

async function fetchIdeas() {
  const response = await fetch('/ideas');
  const ideas = await response.json();
  ideasWallContent.innerHTML = '';
  ideas.forEach((idea) => {
    const ideaDiv = document.createElement('div'); 
    ideaDiv.innerHTML = `
      <h3>${idea.title}</h3>
      <p>${idea.description}</p>
      <p>Contributor: ${idea.contributor || 'Anonymous'}</p>
      <p>Email: ${idea.email || 'N/A'}</p>
      <p>Tags: ${idea.tags || 'None'}</p>
      <hr>
    `;
    ideasWallContent.appendChild(ideaDiv);
  });
}

fetchIdeas();