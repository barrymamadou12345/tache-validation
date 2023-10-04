

// Récupérer les éléments du DOM
const userForm = document.querySelector('#userForm');
const userList = document.querySelector('#userList');
const addUser = document.querySelector('#addUser');
let modifUser = "";
addUser.classList.remove('btnr2');
addUser.textContent = 'Ajouter';
addUser.classList.add('btnr1');
let nom1 ;
let nom2 ;
let nom3 ;
let nom4 ;
let nom5 ;
let nom6 ;

let users = JSON.parse(localStorage.getItem('open')) || []; //Tableau pour stocker les utilisateurs .

function createUser(prenom, nom, email, phone) { //Créer l'objet d'un Utilisateur
  return { prenom, nom, email, phone };
}
function resetForm() { //Effacer le Formulaire
  userForm.reset();
  modifUser = "";
}

function affichageUser() { //Afficher la liste des utilisateurs
  userList.innerHTML = "";
  let titre = document.querySelector('#tr1');
  titre.classList.add('tr2')
  
  users.forEach((user, index) => {
    listItem = document.createElement('div');
    nom1 = ` ${user.prenom}`;
    nom2 = ` ${user.nom}`;
    nom3 = ` ${user.email}`;
    nom4 = ` ${user.phone}`;
    nom5 = ` <button onclick="editUser(${index})">Modifier</button>`;
    nom6 = ` <div class="bouton2" onclick="deleteUser(${index})">Supprimer</div>`;

    listItem.innerHTML = ` 
      <div class="prenom">${nom1}</div> <div class="nom">${nom2}</div> 
      <div class="email">${nom3}</div> <div class="phone">${nom4}</div> ${nom5} ${nom6} 
    `;
    listItem.classList.add('style');
    userList.appendChild(listItem);
    localStorage.setItem('open', JSON.stringify(users));// localStorage
  });
}

users.forEach(() => {
  affichageUser();
  localStorage.setItem('open', JSON.stringify(users));// localStorage
});

function saveUser(event) { //Ajouter un utilisateur
  event.preventDefault();
  const prenom = document.querySelector("#prenom").value;
  const nom = document.querySelector("#nom").value;
  const email = document.querySelector("#email").value;
  const phone = document.querySelector("#telephone").value;

  if(modifUser !== "") {
    users[modifUser] = createUser(prenom, nom, email, phone);
    modifUser = "";
  }else {
    users.unshift(createUser(prenom, nom, email, phone));
  }
  resetForm();
  affichageUser();
  addUser.classList.remove('btnr2');
  addUser.textContent = 'Ajouter';
  addUser.classList.add('btnr1');
}
// Ecouter le Click sur le boutton Ajouter
userForm.addEventListener("submit", saveUser);
  
function editUser(modifier) { //Modifier un Utilisateur
  addUser.classList.remove('btnr1');
  addUser.textContent = 'Modifier';
  addUser.classList.add('btnr2');
  const unique = users[modifier];
  document.querySelector("#prenom").value = unique.prenom;
  document.querySelector("#nom").value = unique.nom;
  document.querySelector("#email").value = unique.email;
  document.querySelector("#telephone").value = unique.phone;
  modifUser = modifier;
}

function deleteUser(index) {//Supprimer un Utilisateur
  users.splice(index, 1);
  localStorage.setItem('open', JSON.stringify(users));// localStorage
  affichageUser();
}
