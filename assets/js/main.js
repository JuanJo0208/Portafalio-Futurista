const navMenu = document.getElementById("nav-menu"),
      navToggle = document.getElementById("nav-toggle"),
      navClose = document.getElementById("nav-close");

/*=============== SHOW MENU ===============*/
// valida si la constante existe
if(navToggle)
{
  navToggle.addEventListener('click', () => {
    navMenu.classList.add("show-menu")
  })
}
/*============== MENU HIDDEN ===============*/
if(navClose)
{
  navClose.addEventListener('click', () => {
    navMenu.classList.remove("show-menu")
  })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLinks = document.querySelectorAll(".nav-link")

function linkAction() 
{
  const navMenu = document.getElementById("nav-menu")
  // cuando se de click en cada nav link, se quitara el show menu
  navMenu.classList.remove("show-menu")
}
navLinks.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scroollHeader()
{
  const header = document.getElementById("header")
  // 
  if(this.scrollY >= 80) header.classList.add("scroll-header"); else header.classList.remove("scroll-header")
}
window.addEventListener("scroll", scroollHeader)

/*=============== TESTIMONIAL SWIPER ===============*/
var swiper = new Swiper(".testimonial-wrapper", {
    loop: 'true',
    pagination: {
      el: ".swiper-pagination",
    },
  });

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/

// obtener todas las secciones que tienes un id definido
const sections = document.querySelectorAll("section[id]");

// añadir un evente listener que escuche un scroll
window.addEventListener("scroll", navHighligther);

function navHighligther()
{
  // obtner la posicion actual del scroll
  let scrollY = window.pageYOffset;
  // iterar cada una de las secciones para obtener su heigth, top y su id para un for each
  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 58,
    sectionId = current.getAttribute("id");

    /* - Si nuestro scrroll actual entra en la posicion de la seccion, añadimos active class y si no es asi
    removemos la clase active 
    - Para conocer que link necesita se ractivado, usamos la condicional sectionId par aluego darle un while que 
    convierta las secciones en un selector */
    if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight)
    {
      document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add("active-link")
    }else{
      document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove("active-link")
    }
  })

}


/*=============== PORTFOLIO ITEM FILTER ===============*/
const filterContainer = document.querySelector(".portafolio-filter-inner"),
      filterBtns = filterContainer.children,
      totalFilterBtn = filterBtns.length;
      portfolioItems = document.querySelectorAll(".portfolio-item");
      totalPortfolioItem = portfolioItems.length;

      for(let i=0;  i<totalFilterBtn; i++)
      {
        filterBtns[i].addEventListener("click", function()
        {
          filterContainer.querySelector(".active").classList.remove("active")
          this.classList.add("active");

          const filterValue = this.getAttribute("data-filter");
          for(let k=0; k<totalPortfolioItem; k++)
          {
            if(filterValue === portfolioItems[k].getAttribute("data-category"))
            {
              portfolioItems[k].classList.remove("hide");
              portfolioItems[k].classList.add("show");
            }else{
              portfolioItems[k].classList.add("hide");
              portfolioItems[k].classList.remove("show");
            }

            if(filterValue == "todo")
            {
              portfolioItems[k].classList.remove("hide");
              portfolioItems[k].classList.add("show");
            }
          }
        })
      }

/*=============== THEME/DISPLAY CUSTOMIZATION ===============*/
const theme = document.querySelector('#theme-button');
const themeModal = document.querySelector(".customize-theme");
const fontSizes = document.querySelectorAll('.choose-size span');
const colorPalette = document.querySelectorAll('.choose-color span');
var root = document.querySelector(':root');
const Bg1 = document.querySelector(".bg-1");
const Bg2 = document.querySelector(".bg-2");
const Bg3 = document.querySelector(".bg-3");

// abrir el modal
const openThemeModal = () => {
  themeModal.style.display = 'grid';
}
// cerrar el modal
const closeThemeModal = (e) => {
  if(e.target.classList.contains('customize-theme'))
  {
    themeModal.style.display = 'none';
  }
}
theme.addEventListener("click", openThemeModal);
themeModal.addEventListener("click", closeThemeModal);



/*===== FONTS =====*/

// Remover la clase activa de los spans o el font size seleccionado
const removeSizeSelector = () => {
  fontSizes.forEach(size => {
    size.classList.remove("active");
  })
}
fontSizes.forEach(size => {
  size.addEventListener("click", () => {

    removeSizeSelector();
    let fontSize;
    size.classList.toggle('active');
    if(size.classList.contains('font-size-1'))
    {
      fontSize = '12px';
    }else if(size.classList.contains('font-size-2'))
    {
      fontSize = '14px';
    }else if(size.classList.contains('font-size-3'))
    {
      fontSize = '16px';
    }else if(size.classList.contains('font-size-4'))
    {
      fontSize = '18px';
    }

    // cambiar la fuente del elemento htm len el root
    document.querySelector('html').style.fontSize = fontSize;

  })
})

/*===== PRIMARY COLORS =====*/

// remover clase activa de los colores
const changeActiveColorClass = () => {
  colorPalette.forEach(colorPicker => {
    colorPicker.classList.remove('active');
  })
}

colorPalette.forEach(color => {
  color.addEventListener('click', () => {
    let primaryHue;
    changeActiveColorClass();

    if(color.classList.contains('color-1'))
    {
      primaryHue = 252;
    }else if(color.classList.contains('color-2'))
    {
      primaryHue = 52;
    }
    else if(color.classList.contains('color-3'))
    {
      primaryHue = 352;
    }
    else if(color.classList.contains('color-4'))
    {
      primaryHue = 152;
    }
    else if(color.classList.contains('color-5'))
    {
      primaryHue = 202;
    }
    color.classList.add("active");
    root.style.setProperty('--primary-color-hue', primaryHue)
  })
})

/*===== THEME BACKGROUNDS =====*/
let lightColorLightness;
let whiteColorLightness;
let darkColorLightness;

// cambiar el color de fondo
const changeBG = () =>{
  root.style.setProperty('--light-color-lightness', lightColorLightness);
  root.style.setProperty('--white-color-lightness', whiteColorLightness);
  root.style.setProperty('--dark-color-lightness', darkColorLightness);
}
Bg1.addEventListener('click', () => {
  // Añadir la clase active
  Bg1.classList.add('active');
  // remover la clase active de las otras
  Bg2.classList.remove('active');
  Bg3.classList.remove('active');
  // remover el cambio customizado del local storage
  window.location.reload();
})
Bg2.addEventListener('click', () => {
  darkColorLightness = '95%';
  whiteColorLightness = '20%';
  lightColorLightness = '15%';

  // Añadir la clase active
  Bg2.classList.add('active');
  // remover la clase active de las otras
  Bg1.classList.remove('active');
  Bg3.classList.remove('active');
  changeBG();
})

Bg3.addEventListener('click', () => {
  darkColorLightness = '95%';
  whiteColorLightness = '10%';
  lightColorLightness = '0%';

  // Añadir la clase active
  Bg3.classList.add('active');
  // remover la clase active de las otras
  Bg2.classList.remove('active');
  Bg1.classList.remove('active');
  changeBG();
})
