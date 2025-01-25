const supabaseUrl = "https://dwodjiisdxnqstgkvacw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3b2RqaWlzZHhucXN0Z2t2YWN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxMzQwODgsImV4cCI6MjA1MjcxMDA4OH0.Ny_TwbFRID5na4EhDXSmd-qsCmDrrWhvNXunedMNEGA";
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

const supabaseClientUrl2 = 'https://bdrflirnejsfjovaulrw.supabase.co'
const supabaseClientKey2 =  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkcmZsaXJuZWpzZmpvdmF1bHJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc0OTE2NzUsImV4cCI6MjA1MzA2NzY3NX0.rtpWhUuVEw9GKJ1Iv8NCWRH1SB8OSRBcorah_xVRwh8'
const supabaseClientInfo = supabase.createClient(supabaseClientUrl2, supabaseClientKey2)

// console.log(supabaseClient)

async function Call() {
  const { data, error } = await supabaseClient.from("users").select();
  // .eq('uid', data.user.id)
  // .single()
  let userName = data[0].userName;
  console.log(userName);

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

async function featchData() {
  const { data, error } = await supabaseClientInfo
    .from('articles')
    .select()

    console.log(data);
    
    let articlesBox = document.getElementById("articlesBox");

  for (let i = 0; i < data.length; i++) {

    const articles=data[i]

    const imageSrc = `${supabaseClientUrl2}/storage/v1/object`;

    const articleContainer=document.createElement('div')
    articleContainer.classList.add('articleContainer')
    articleContainer.innerHTML=`
     <div class="articleImg">
                    <img src="${imageSrc}/${articles.imageUrl}" alt="">
                </div>
                <div class="articleContent">
                    <div class="articleHead">
                        <h4>${articles.articleTitle}</h4>
                    </div>
                    <div class="articlePara">
                        <p>${articles.articleContent}</p>
                    </div>
                    <div class="articleAuthor">${articles.articleAuthorName}</div>
                    <div class="articleDate">${articles.articleDate}</div>
                </div>
            </div> `

            articlesBox.appendChild(articleContainer)
    
  //   let articleImg = document.createElement("div");
  //   articleImg.classList.add("articleImg");
  //   let articlePhoto = document.createElement("img");
  //   articlePhoto.setAttribute("src", `${imageSrc}/${articles.imageUrl}`);

  //   let articleContent = document.createElement("articleContent");
  //   articleContent.classList.add("articleContent");
  //   let articleHead = document.createElement("div");
  //   articleHead.classList.add("articleHead");
  //   let articleHeadText = document.createElement("h4");
  //   articleHeadText.innerHTML = articles.articleTitle;
  //   let articlePara = document.createElement("div");
  //   articlePara.classList.add("articlePara");
  //   let articleParaText = document.createElement("p");
  //   articleParaText.innerHTML = articles.articleContent;
  //   let articleAuthor = document.createElement("div");
  //   articleAuthor.classList.add("articleAuthor");
  //   articleAuthor.innerHTML = articles.articleAuthorName;
  //   let articleDate = document.createElement("div");
  //   articleDate.classList.add("articleDate");
  //   articleDate.innerHTML = articlesBox.articleDate;

  //   articlesBox.appendChild(articleImg);
  //   articleImg.appendChild(articlePhoto);
  //   articlesBox.appendChild(articleContent);
  //   articleContent.appendChild(articleHead);
  //   articleHead.appendChild(articleHeadText);
  //   articleContent.appendChild(articlePara);
  //   articlePara.appendChild(articleParaText);
  //   articleContent.appendChild(articleAuthor);
  //   articleContent.appendChild(articleDate);
  }
}

featchData();