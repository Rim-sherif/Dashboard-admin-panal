import React, { useState, useEffect } from 'react';
import logo from '../../assets/images/images/9829 2.png';
import { Link } from 'react-router-dom';

export default function Sidebar({ expanded, setExpanded }) {
  const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
      const media = window.matchMedia(query);
      if (media.matches !== matches) {
        setMatches(media.matches);
      }
      const listener = () => setMatches(media.matches);
      window.addEventListener("resize", listener);
      return () => window.removeEventListener("resize", listener);
    }, [matches, query]);

    return matches;
  };

  let menuItems = [
    {
      image: logo,
      iconClass: "fa-solid fa-bars",
    },
    {
      name: "Home",
      iconClass: "fa-solid fa-home",
      url: "home",
    },
    {
      name: "Users",
      iconClass: "fa-solid fa-users",
      url: "clients",
    },
    {
      name: "Messages",
      iconClass: "fa-solid fa-envelope",
      url: "messages",
    },
    {
      name: "Products",
      iconClass: "fa-solid fa-store",
      url: "products",
    },
    {
      name: "Engineers",
      iconClass: "fa-solid fa-helmet-safety",
      url: "engineers",
    },
    {
      name: "Requests",
      iconClass: "fas fa-comments fs-5 bi-bootstrap",
      url: "requests",
    },
    {
      name: "Profile",
      iconClass: "fa-solid fa-user",
      url: "profile",
    },
    {
      name: "LogOut",
      iconClass: "fa-solid fa-arrow-right-from-bracket fa-rotate-180",
      url: "/",
      color: "white",
      rotate: "180",
      
      
    },
  ];

  // eslint-disable-next-line no-unused-vars
  const [hovered, setHovered] = useState(null);
  const [active, setActive] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [animate, setAnimate] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const changeSmall = useMediaQuery("(max-height: 550px)");
  let delay = 1;

  useEffect(() => {
    setAnimate(true);
    let timer = setTimeout(() => setAnimate(false), delay * 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [active, delay]);

  return (
    <div className={`sidebar ${expanded && "expanded"}`}>
      {menuItems.map((item, index) => {
        let middle = false;
        if (!(index === 0 || index === menuItems.length )) {
          middle = true;
        }
        return (
          <Link
            to={item.url}
            key={index}
            className={`boxicon-container ${expanded && "expanded-boxicon-container"}`}
            onMouseEnter={() => {
              if (middle) {
                setHovered(index);
              }
            }}
            onMouseLeave={() => {
              if (middle) {
                setHovered(null);
              }
            }}
            onClick={(e) => {
              if (index === 0) {
                e.preventDefault();
                setExpanded(!expanded);
              }
              if (middle) {
                setActive(index);
              }
            }}
          >
            {index === 0 ? (
              !expanded ? (
                <i
                  className={`${item.iconClass} boxicon`}
                ></i>
              ) : (
                <img
                  src={item.image}
                  alt="Logo"
                  className={`menu-icon logo ${active === index && "active-icon"}`}
                  style={{ width: "100px", height: "auto" }}
                />
              )
            ) : (
              <>
                {item.iconClass && (
                  <i
                    className={`${item.iconClass} ${middle && "boxicon"} 
                      ${!middle && "first-and-last-trash-fix"}
                      ${active === index && ""}`}
                  ></i>
                )}
                <p
                  className={`description 
                    ${expanded && "show-description"}
                    ${active === index && "active-description"}`}
                >
                  {item.name}
                </p>
              </>
            )}
          </Link>
        );
      })}
    </div>
  );
}
