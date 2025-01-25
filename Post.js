const supabaseUrl = "https://dwodjiisdxnqstgkvacw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3b2RqaWlzZHhucXN0Z2t2YWN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxMzQwODgsImV4cCI6MjA1MjcxMDA4OH0.Ny_TwbFRID5na4EhDXSmd-qsCmDrrWhvNXunedMNEGA";
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

const supabaseClientUrl2 = 'https://bdrflirnejsfjovaulrw.supabase.co'
const supabaseClientKey2 =  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkcmZsaXJuZWpzZmpvdmF1bHJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc0OTE2NzUsImV4cCI6MjA1MzA2NzY3NX0.rtpWhUuVEw9GKJ1Iv8NCWRH1SB8OSRBcorah_xVRwh8'
const supabaseClientInfo = supabase.createClient(supabaseClientUrl2, supabaseClientKey2)



console.log(supabaseClient)
console.log(supabaseClientInfo)

async function Call() {
  const { data, error } = await supabaseClient.from("users").select();
  //   .eq('uid', data.user.id)
  //   .single()
  let userName = data[0].userName;

  let profile = document.getElementById("profile");
  let profileImg = profile.firstElementChild;
  let profileUserName = profile.lastElementChild;
  profileUserName.innerHTML = userName;

  profileImg.innerHTML = userName[0];
  profile.appendChild(profileUserName);
  profile.appendChild(profileImg);

  const h = Math.floor(Math.random() * 360);
  const s = Math.floor(Math.random() * 101);
  const l = Math.floor(Math.random() * 101);
  let colors = `hsl(${h}, ${s}%, ${l}%)`;
  console.log(colors);

  profileImg.style.backgroundColor = colors;
}

Call();

async function Submit() {
  var articleTitle = document.getElementById("articleTitle").value;
  var articleContent = document.getElementById("articleContent").value;
  var articleAuthorName = document.getElementById("articleAuthorName").value;
  var articleDate = document.getElementById("articleDate").value;
  var file=document.getElementById('file')
  let fileName=`${Date.now()}-${file.files[0].name}`
  
  console.log(fileName)

  console.log(articleAuthorName)
  console.log(articleContent)
  console.log(articleTitle)
  console.log(articleDate)
  
  const { data, error } = await supabaseClientInfo.storage
    .from("images")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

    console.log(data)

    if (error) {
      alert("Image upload failed");
      console.log(error);
      return;
    }
    
  const { error:tableError, data:tableData} = await supabaseClientInfo
    .from("articles")
    .insert([
      {
        articleTitle,
        articleContent,
        articleAuthorName,
        articleDate,
        imageUrl:data.fullPath
      }
    ])
    .select();

    console.log(tableData)
    console.log(data.fullPath)

window.location.reload()
alert('Data have been submitted!')
}