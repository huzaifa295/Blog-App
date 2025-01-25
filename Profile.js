const supabaseUrl = 'https://dwodjiisdxnqstgkvacw.supabase.co'
const supabaseKey =  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3b2RqaWlzZHhucXN0Z2t2YWN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxMzQwODgsImV4cCI6MjA1MjcxMDA4OH0.Ny_TwbFRID5na4EhDXSmd-qsCmDrrWhvNXunedMNEGA'
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey)


console.log(supabaseClient)


async function Call(){
    const { data, error} = await supabaseClient
  .from('users')
  .select()
//   .eq('uid', data.user.id)
//   .single()
  let userName=data[0].userName

let  profile=document.getElementById('profile')
let  profileImg=profile.firstElementChild
let profileUserName=profile.lastElementChild
profileUserName.innerHTML=userName

profileImg.innerHTML=userName[0]
profile.appendChild(profileUserName)
  profile.appendChild(profileImg)

  const h = Math.floor(Math.random() * 360);
  const s = Math.floor(Math.random() * 101);
  const l = Math.floor(Math.random() * 101);
  let colors= `hsl(${h}, ${s}%, ${l}%)`;
  console.log(colors)

  profileImg.style.backgroundColor=colors

  let userImg=document.getElementById('userImg')
  userImg.innerHTML=userName[0]
  userImg.style.backgroundColor=colors

  let userInfo=document.getElementById('userInfo')
  let userNameDiv=userInfo.firstElementChild
  userNameDiv.innerHTML=userName
  
  
  const { data:tableData, error:tableError} = await supabaseClient
  .from('users')
  .select()
  let userEmail=tableData[0].userEmail
  
  
  let userEmailDiv=userInfo.lastElementChild
  userEmailDiv.innerHTML=userEmail
}

Call()