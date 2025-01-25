const supabaseUrl = "https://dwodjiisdxnqstgkvacw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3b2RqaWlzZHhucXN0Z2t2YWN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxMzQwODgsImV4cCI6MjA1MjcxMDA4OH0.Ny_TwbFRID5na4EhDXSmd-qsCmDrrWhvNXunedMNEGA";
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

console.log(supabaseClient);

let loginPage = document.getElementById("login-page");
let signUpPage = document.getElementById("signup-page");

let signup = document.getElementById("signup");
let login = document.getElementById("login");

signup.addEventListener("click", () => {
  signUpPage.classList.remove("hide");
  loginPage.classList.add("hide");
  // console.log('hi')
});
login.addEventListener("click", () => {
  signUpPage.classList.add("hide");
  loginPage.classList.remove("hide");
});

// Login

let loginUserEmail = document.getElementById("loginUserEmail");
let loginPassword = document.getElementById("loginPassword");

let loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", () => {
  if (loginPassword.value == "" || loginUserEmail.value == "") {
    alert("Please fill all the fields");
    return;
  }
  console.log(loginUserEmail.value);
  console.log(loginPassword.value);
});

async function signIn() {
  const email = loginUserEmail.value;
  const password = loginPassword.value;

  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: email,
    password: password,
  });

  try {
    if (error) {
      alert("login failed");
      console.log(error);
      return;
    }
  } catch (error) {
    console.log(error);
  }

  let loginInfo = data.user.id;
  console.log(loginInfo);

  const { data: tableData, error: tableError } = await supabaseClient
    .from("users")
    .select();
  let userInfo = tableData.map((item) => item.uid);
  console.log(userInfo);

  for (let i = 0; i < userInfo.length; i++) {
    if (loginInfo == userInfo[i]) {
      alert("Login Successful");
      window.location.href='./home.html'
      loginUserEmail.value = "";
      loginPassword.value = "";
      return;
    }
  }

  alert("Login Failed");
}

// SignUp

let signupUserName = document.getElementById("signupUserName");
let signupEmail = document.getElementById("signupEmail");
let signupPassword = document.getElementById("signupPassword");

let signupBtn = document.getElementById("signupBtn");

signupBtn.addEventListener("click", () => {
  if (signupPassword.value.length < 8) {
    alert("Password must be atleast 8 characters long");
    return;
  }

  if (
    signupPassword.value == "" ||
    signupUserName.value == "" ||
    signupEmail.value == ""
  ) {
    alert("Please fill all the fields");
    return;
  }

  // function isValidName(name) {
  //   const regex = /^[A-Za-z\s]+$/;
  //   return regex.test(name);
  // }

  // const signupName = signupUserName;
  // if (isValidName(signupName)) {
  //   console.log("Valid name!");
  // } else {
  //   alert("Invalid User Name");
  //   return
  // }

  if (signupEmail.value.includes("@gmail.com") == false) {
    alert("Invalid Email");
    return;
  }

  console.log(signupUserName.value);
  console.log(signupPassword.value);
  console.log(signupEmail.value);

  signupEmail.value = "";
  signupPassword.value = "";
  signupUserName.value = "";
});

console.log("Hello");

async function signUp() {
  const userName = signupUserName.value;
  const userEmail = signupEmail.value;
  const userPass = signupPassword.value;
  console.log(userName, userEmail, userPass);

  const { data, error } = await supabaseClient.auth.signUp({
    email: userEmail,
    password: userPass,
  });
  console.log(data)

  if (!error) {
    alert("User Signup successfully");
  }

  const { error: tableError, data: tableData } = await supabaseClient
    .from("users")
    .insert([
      {
        userName,
        userEmail,
        uid: data.user.id,
      },
    ])
    .select();

  console.log(tableData);
}