import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { collisions } from "./collisions";
import {
  shopNavigateData,
  forumNavigateData,
  shopPopupData,
  aboutPopupData,
  minigamePopupData,
  minigameNavigateData,
  leaderboardPopupData,
  navigateWebsiteData,
  logoutData,
} from "./navigateZones";
import { useNavigate } from "react-router-dom";
import GameModal from "../GameModal";
import { GameContext } from "../../ContextProvider";

//Array That Stores All Tiles That Is A Collision Tile
const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 70) {
  collisionsMap.push(collisions.slice(i, 70 + i));
}

//Array That Stores All Tiles That Trigger A Navigation To Shop
const shopNavigate = [];
for (let i = 0; i < shopNavigateData.length; i += 70) {
  shopNavigate.push(shopNavigateData.slice(i, 70 + i));
}

//Array That Stores All Tiles That Trigger A Navigation To Forums
const forumNavigate = [];
for (let i = 0; i < forumNavigateData.length; i += 70) {
  forumNavigate.push(forumNavigateData.slice(i, 70 + i));
}

//Array That Stores All Tiles That Trigger The Minigame
const minigameNavigate = [];
for (let i = 0; i < minigameNavigateData.length; i += 70) {
  minigameNavigate.push(minigameNavigateData.slice(i, 70 + i));
}

const websiteNavigate = [];
for (let i = 0; i < navigateWebsiteData.length; i += 70) {
  websiteNavigate.push(navigateWebsiteData.slice(i, 70 + i));
}

//Array That Stores All Tiles That Trigger Signboard Modal Popup For Shop
const shopPopup = [];
for (let i = 0; i < shopPopupData.length; i += 70) {
  shopPopup.push(shopPopupData.slice(i, 70 + i));
}

const aboutPopup = [];
for (let i = 0; i < aboutPopupData.length; i += 70) {
  aboutPopup.push(aboutPopupData.slice(i, 70 + i));
}

//Array That Stores All Tiles That Trigger Signboard Modal Popup For Forum
const minigamePopup = [];
for (let i = 0; i < minigamePopupData.length; i += 70) {
  minigamePopup.push(minigamePopupData.slice(i, 70 + i));
}

const leaderboardPopup = [];
for (let i = 0; i < leaderboardPopupData.length; i += 70) {
  leaderboardPopup.push(leaderboardPopupData.slice(i, 70 + i));
}

const logoutNavigate = [];
for (let i = 0; i < logoutData.length; i += 70) {
  logoutNavigate.push(logoutData.slice(i, 70 + i));
}

const keys = {
  ArrowUp: {
    pressed: false,
  },
  ArrowDown: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  W: {
    pressed: false,
  },
  A: {
    pressed: false,
  },
  S: {
    pressed: false,
  },
  D: {
    pressed: false,
  },
};

let lastKeyDown = "";
document.addEventListener("keydown", function (playerWalk) {
  switch (playerWalk.key) {
    case "ArrowUp":
      keys.ArrowUp.pressed = true;
      lastKeyDown = "ArrowUp";
      break;
    case "ArrowDown":
      keys.ArrowDown.pressed = true;
      lastKeyDown = "ArrowDown";
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      lastKeyDown = "ArrowLeft";
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      lastKeyDown = "ArrowRight";
      break;
    case "w":
      keys.w.pressed = true;
      lastKeyDown = "ArrowUp";
      break;
    case "s":
      keys.s.pressed = true;
      lastKeyDown = "ArrowDown";
      break;
    case "a":
      keys.a.pressed = true;
      lastKeyDown = "ArrowLeft";
      break;
    case "d":
      keys.d.pressed = true;
      lastKeyDown = "ArrowRight";
      break;
    case "W":
      keys.W.pressed = false;
      break;
    case "S":
      keys.S.pressed = false;
      break;
    case "A":
      keys.A.pressed = false;
      break;
    case "D":
      keys.D.pressed = false;
      break;
    default:
      break;
  }
});
document.addEventListener("keyup", function (playerWalk) {
  switch (playerWalk.key) {
    case "ArrowUp":
      keys.ArrowUp.pressed = false;
      break;
    case "ArrowDown":
      keys.ArrowDown.pressed = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case "w":
      keys.w.pressed = false;
      break;
    case "s":
      keys.s.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
    case "W":
      keys.W.pressed = false;
      break;
    case "S":
      keys.S.pressed = false;
      break;
    case "A":
      keys.A.pressed = false;
      break;
    case "D":
      keys.D.pressed = false;
      break;
    default:
      break;
  }
});

const Dashboard = ({ draw, height, width }) => {
  const [
    leaveShop,
    setLeaveShop,
    leaveForum,
    setLeaveForum,
    offset,
    setOffset,
    leaveDungeon,
    setleaveDungeon,
  ] = useContext(GameContext);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [whichModal, setWhichModal] = React.useState("");
  const canvas = React.useRef();

  const navigate = useNavigate();

  React.useEffect(() => {
    const ctx = canvas.current.getContext("2d");

    //Getting Player Image To Render On Map
    let playerImage = new Image();
    playerImage.src =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAABECAYAAADX/TrJAAAABHNCSVQICAgIfAhkiAAABRZJREFUeF7tna1vlEEQxns4vkIQVBCCIqGkipAgG6oQFQgMgvAngEERJEFh4E8gCAwCUYEqqSQhqAZIUIQgiiCELwfYm7myv07m9u7dvafusrPvzT77PDOzH29vtBT8e3ht/W+wS8j81tOtUahD0Fj+lwFbNPzDZBOBRKBgzDHmQ+OPBJCZzT36LloEjcInAQBiIlAZoKERqHsBeMCPHT1ixnzp/CnzeefdxyImqyunTfvLN5/M52/ff5jPWUHIfzsdwt/igSWQCCQCRaP8uP3Q+SMBKIMtdAaWACQACaBmyqL0Oe2adNopV/7H1mSt4T+RAVobgCeo/CfJ1l3TtIa/BAC7VkQnZTCLkARAjHHtIlDbBGo9A2MGOLN8yIzRE5b2/UkP9LwPu79C5wI+Asn/8gwsOv4SwJRLIB8QJOBhB1AJQAIonuT3LmAJQAJYbAHQqv3EwT+huz20JqCa03/Zl98Higc13t7fVZL/5W1Pmq/e8R9JAPZyHhFCArYHY60HIAnA3U6VACyllQFUAqW2gXsnUPcZwA+Qamra96d2Txhv798XoAmQ/4R4OeL3jj+WQCKQCDSOQG8BSAKI8RutlcHsG4NDD6ASAFI6ZiABNC6AaE0dVTgRJFpzEj39uQDZ0xpH/hOCtn3o+E9kAAmgfPAnAUgARQQUQS08tGgkOg09grbuvzKAm0EJeLEEjJfhsiURRYhozU//J4j+cVQ0osp/i0Bv+EsAUYaDPZU8vRHIw9FaAJIAJACDwKIJWAKQACSAcQQohRFfqMamCEPPz5YQ9Hz5X0aoN/zDGUAEKt+HJ3x6I1B0DUD4zDoASQBuRmY9Aa0TqHX/JQAJgIKyae8tg4X/OW4IrSkYE+D0Fdk1DT2f2q+srRgT/8bZxqPN4hzM23/Cf/PmhvnNOP/K6PPtdwRR1XbyXwKoCv/SkgQgAaQoRgqmh887gkoAEgBxtNguAdT9WVqaHMK/uxLID+jkjTsGo+0HdwmzVPva7Xum/+fH981nqpmH5v/Zn6+N/1vPXhTHMzT/CX/v7/rVy2Z87w9fGDR/JtYArU2AV9vQ/JcAJIBQRlAGsLsqQ8/AygAherOxBCABMEv+bxHlz4gWMV8vXs/4k+57/NWT0D46lUBph4IPiNbQfh9d+AcBd+aEvwSQwxd70wQoACGEKQPCXwJIwcudaQIkAMYwY0H4SwAZdPfRlyZAAtgHiAkTwn9CAH4fd3fnrfn62jWpr/mXV8+l9tFnXVMT4LRt2zr+ND6/q5Xg9p5do2tGCWDKMyABWEBnvSkhAcDtxNoZTAKQAFIxVSWQvUrQWgnaXAlEDvv22jWcj6D++6N3gWZdU0czQG/403imzZ9swMS7QBJALKFJALMtgSQAx0+6m1K7pJAAJIBYyHTWKoHsXaDWMnDzJRANwO+re/voryxSf6r5SW0+I3j7aZ8TZDNA7/hn1wC0zRldM+I7wXRSSQQmwlF/CaD80jnhNzT8JQD3u7w0gRKABDDOEWUAqnlgUUwRMXtQphKo7iJ45gKgmjRac1FNno34QX0skT/RNU9t/8lf+v5s/yi+xJ8ovlG+kb+4BqABRB2a9wRExxOdICIgTQi1Z/HL9if/qH3aa8os3hKAuztEJVLtNUuUQK0FIAkACJdVNBFIGaB8zlAb/+YFECVY6/bzLhlax4/8nze+4RKIBtRb+7wnqDc8oxm4dkaSAIBhEkBdCc4bXwlAAqjL8IHj+w9dABa4EMSJUgAAAABJRU5ErkJggg==";

    let playerImageDown = new Image();
    playerImageDown.src =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAABECAYAAADX/TrJAAAABHNCSVQICAgIfAhkiAAABQ9JREFUeF7tnb1rFUEUxfMs/UDSpBBJJRhJJYKlmMriFSo2FiKCWIgYwdI/wFIwIhYiiFjYiFqksEqwFMQqGMFKxCIWQfwqtX33PpnDZXazM7u/dMvs5t05c889Zz7evtFM8O/u+aW/wUdCt994tjYKPRC8mfjTgA0N/3CykUAkULDmmNtLyx8IkDOa/3l2aBU0Ch8EEIiRQGmASkug3hPAA75/317T55NHD5rrjc3PSUwWF+ZN+/r7L+b6+4+f5jqXEMRvhwP8LR7SApFAJFC0yk/eX3r+QAAUbNAKDAEgAARoU7KUfDbtSZuWXOKPzclqw39KAWrrgE9Q4leUbXdOUxv+EECsWql0QsEsQhBAZYxrJ4HqTqDaFbg4BfD7CJ+2fof2BbquQMRvz4rl7hupeuoLaBR/CNCwBYoOQGkVdGjxQwAIkNzJ77sCQwAIMGwCKM+sPFjuWSB1dujbn13JjRofn/ecxJ9e9hw6/iMIkHeYb+gJVHsBggCZRyEggKVAbQoMASBA0iX23YJmE8Cf3/doHprbrWy4afeA+4fV50UrkPp/xG9HQOFVG/4QwH0BBwLbRYe+FyAIAAEGrcAQAAJAgEkElIfzHvD0iYWkx3/1ZjPZrj6vaQkm/rxVm9w5QGn4hxWgtA5E16GJHwJMIgABULDQKh0K4DwzFsi+JkZlU98SqHYFlofhfAd9ws8tHkmO+dbGh6w5gn9YvSdIvTiK+C2iao7Wd/whAARWomXa+1aAIAAEgACTCGAhbD5g4Sweg1MA75lnz1w3iDy+ec1cX7l6NllRHj54Ydov3blvrrdf3jPX3qNGB4D47XCAv/39CWmBSCASaBKBvhUgCICCDVqBIQAEgAAp0+4nxd7jj5cfmcdXVy4n5wDqfu9RleSqJYyu4/cW0n+DbLyymnxBcdfxK/xXl8fmN+P8e3r8HK60/Am/Hbq0DkCAbgsQBEABDAe9gqEA9jRwaQUUBWiZwBCgMgJ4STtw8ZapcLNvn5prdRZIWRS/0bR9/IJ55OuT2+ZaeebS4j/8652Jf+3562R/Sotf4e/jXTp3yvTv455jRefPlALUNgCeYKXFDwEgQFIEUAC7ClQagVEALFAWgVGAwhVALWN5T+6zwc8JlOf37dH/r9bRVQXd6fijFdSvo0fxAX+LgMJ/BAHspL7pBFIDAP7d4g8B3KoWBLAIeIXvmwJDAAiQ5PzgCODXcdUqTbRiqvvVPkN0HT3qqVV8ql1ZHrVsWzv+qn9+X0nhGW2PEnZKAWofgFxPHQXc3w8BLCLRRYlc/CGAOJ2oVlVyBwACQICsHMIC2aMEtVnQ6iyQCti3t+3hfAX1nx89C7TTli6qAH3DX/Wn6fzJLZjyLBAEiAkaBNhZCwQBXH6q04ltWwoIAAFiJdPdjQWyXzGsTYGrt0CqA35d3d+vfjUx+rzy/IptXhH8/U3vE+QqQN/xz50DqGXO6JxRfiNMratDAIsABGjXAkEAVfLFnAAFmE8iqM76BOGfaXojDAIERwALZAHr2oJWZ4GUJ416LpWQuZ4/yI+pCqUUQlm+tuPPxS/3+Si+Kn+ihIzmm4pXzgFUB6IBdT0A0f5EBwgCpFOu6TllLt4QwJ0dQgHSb6pTFVW1QwCRcLmMVgOAAqT3GdrGv3oCRBOs9vtLs2y14xktQG0TMmyB+jYAqj8QQCGU1941vhBAjF/XA5SXXuU/3TW+EAACdMqSrgnwDw/+BtZA1QwBAAAAAElFTkSuQmCC";

    let playerImageRight = new Image();
    playerImageRight.src =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAABECAYAAADX/TrJAAAABHNCSVQICAgIfAhkiAAABL5JREFUeF7tnT+LFEEQxe/MFEUMvMBADAxO7hsYCMYbiJmRmIiocIKhH8BQUBAjUcTAxPACo8vNDw2MLjA4I1E0U9lxT7eK3anqf7s927/LlpmerX71Xr3qntmb9bXIv8fXLv+OHDpz2L03u+s5r2ddi/glQq3iH006CASBrCLTd7wW/iCAlCxOjW21gsbChwAUchAojEq1ECgs6v9n1xK/2wF0wOc3jom5b22eFZ/3Pu4HYfPp4Ic4P7cgiL8/Ha3ijwAmvEDAbRYgBIAAOgRwAKNhoYWghQjqadXJtfJnrgOUDtgCM7UiEb+FcFlBDwV/BDDhQeii3aIXApY3SnNvmuTCHwEggJlcakXACAABIIAxArpnO3niuADm9NFfWff9rW3HLz+PiO/7+u17730C4g+77wL+f589++cAEAgCTVeYVgoQAohsgaig8undoRZQBIAAOgT0LhgOYKwB9MpJV0Rrm8oCXI/PvQYgftnyacK3gn+0A0AgCDTNgdAWqBb+IIBJJnAwueuGA9AC9XZxtHBpi+DBOYAOWN8XsHp+fVzfaQwdr38vYFkw8UsEwD/wPgAEgkDTCKxKAXKvARAAAkAAUwjQAslfUNHCyac/9aM0tRbQaAcITbjex7/x6Km4xMv7d8XnK5c2xedzd571/notdA1A/OA/5gACcCoBAa9mAUIACKBDoFUHRgAIAAGMEVh0D33z9lVBvdH2c/H5xa2LVa8BiF9WjqHyZ2kOAIFWg0CHs0AARiuhF5EIAAE4u8/utFL8wQGcWSiVgKFX0KHH7/5RvHVjQ/PIIozFu4O9D0FrAH29VEsm/jbwRwBzlIgAEIB4AwwOIHetcLB+BIbiwDgADjATgVZa0Oj/Dm1VQOtf4VnjrWd/rPHWmsAaT/z9jz5Y+A0FfwQwJ5MIAAEIaoS+0gYCtUEgrxPUyh8cAAeYiUArLahbABqlne2R2CU6c/1BbzH4/Oph7/HRk53oWLxVaPo84peotYp/NOkgEASKKTyHY2rhDwKYZAQHa9OBEQAC6BCgBTL8LNSyQu1RrxFyJ4T4+zPSKv5uB4BAECi0qKVsOoR+V6yAEUAo0nPOj02A9+spQGUKEALwMtA4DwH0A1SrgLMJQBNA76qcev9aIBT6WtLUNUFoAlLnkxpv7vsu1i6XlZ/U+dSKPwJwtjShgk4lDAKQN05L4Y8AEECHAA6QuA2a2jJYrXhqRa3Vgq1557pzSgs0G+liDqDfuLKxdUFEsPv2nfhsvXVx2QIInU9qvKktkB6vC9Si55NagErFiwCcLVCpBJRyAATge7QDASCADgHLoVMdDQegBfIW+5nnhRIIByjsANZbFUP3+XXCUiuOxTZNqNT5DC1eC5+hzSc23ugWKJUwJMBCQB7PLVjr22MJZV133q5WKp9i40UAk4wsKwHLIoz1vbGEsq6LAJwItZIAJxxrOMB+L1SxfHE7gLUvvege3ksc73maYNa4WMCt63qPW/EuOz7vPOY5gjU+1/wQwARpi1C1CdyKNxdBLCLmOm7NpxT+CAAB5OJw0nUQQBJ86YOXlYDYyK14cQAfstEO4Ls8Z4FA3QgggLrzQ3SFEUAAhQHm8nUjgADqzg/RFUbgD4aB7L39/IX9AAAAAElFTkSuQmCC";

    let playerImageLeft = new Image();
    playerImageLeft.src =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAABECAYAAADX/TrJAAAABHNCSVQICAgIfAhkiAAABOZJREFUeF7tnaGP1UAQxt/hIBAUJxAoBOQ8/hTiJAZBCARFSCBB8gcgSbgECMEQFI4gTpMg+A8unEAQBOIQhEDAAeHuPXg7tP1mt+11t/2da3bbm/nm+2Zmt33tyizx7/7F9V+Jp1aeduv5q5Uur6euhf0hQlPFP5l0EAgCqSTTNJ4LfxBAmygunTvVDJoKHwIwyEGgOCrlQqA4q//NzsV+dwWwBp9ePRLl+9qZU8H87Z0PwfG73e/BcdeCwH7wryIsAnDKGAE7gaqZlmsCQgDOuCIAJ1AIoBoBCDROAnm9Kq4CtDVYAdO3ILC/OQLgv49PbQsEgSDQMgKxmxKl8AcBqFJVM04GbQYOAQhiQaBxEKjOi+IEYA0+fuxo4NuJwz+DY0VglVjV+Z9+HAou8eXrt8b7BNgf3lcBfx9//rZAEAgCLYtmKgkIAcyjbu9Mk0F9GXSBU6kJFAEggD0EbAKgApg1gM2Iak2gMqjKuF0HAPtDBMB///cn7goAgSBQ030B1QLlyh8EMI+M3ZWignW7BkAABgFKcPgT0FIzqHcRXJwAVAa047G/D7Dn257fjsfeB8D+OASmin9tCxQH32yGAMKWAQHHMWgo/iCAeZyGCkBdCxFHHxJQagVDAAhgD4FUApUu4NqnQd8/vB689+fl650gKV259yA4fnr7RnBsnyWKzWixLYSdj/3hs1zgX/0sGQKYMwMBN0tEbUKUmoAQAAJwFQcEQAvkIkrdpLESqM7fUlpQdwW4+vhN4OvW5rXg+MmjF1mvAbC/lX5nbQWcK/4IYM4LBNzvGgABtEtAo81A3hYiVwKVbj8VgArgSk2Tb4FW1866gFpMattSxAKutuGwP+6+wFTwd1cACASBYjKg3QXKlT8IoCaqVLDmt3AoMSCAltuiUynB3kVkrhm0dPvdb4e2ilYZQL3/X50f+yo+dT3sD7+/oPCaCv4IoIYJCLjbjxbmmoAQAAKoRIAKYGDJVcGqlC/GsZ8WqIor7gpgT966udH4neCTl+80cvPjs7vB+MbmVrItXhEsz8N+8P/Dh2TSQSAIlJJ4Fufkwh8EUBNFKlgbeutzEQAtkGZJw4xcCJTqRC72uyuANVhlyFhg+l4TYH9zRKaKPwKIVWrN/KkSyAtfrgkIAXgjKOYhgGaAEAAEaiW1XAnkdSpX+5MrgH2b8udzlwIsbEZUa4auM6gFXNlrAzm0/eq+i/JnaPvVItf619afVP4gAGdPf9ACRgBxCRUBGMZQAcIbdQctYCqA2ecfOgCqxNICdXtne/QCWL9wPuDM7vbb4Ng+Tjy0ALq2Vwmm62ebLKG69ie1hahbBKsKbPnR1p9U+5PXAG0N7ptAfROmb/vVGqA0/NWH0dv6gwDEGqAtwGq7LzUA6rqL8b4F3bX9VICd8MvrtEBeqlfPQwDNfEoVsLsFUiVZ7evacdsDdt0zx9qr6Km+IpmbP6XZOxT+CEAhPx8vjVCl2avC0Jc/CEAhjwCcCDVPi90WPaiOAgE4w9tXBnL++/+mKUKVZq/CoS9/kgXQtsfuu+dXgMaOK8IN7Y+yz/o7tL254I8AnJFQBBuaUMo+BFAdaASAAJwIDDtNCTw1ASEAZ1z7CoDz38tpyj4qQM8VQEaICSCQIQKdVYAMfcMkEJAIIAAJERPGjAACGHN08U0i8BvfsdzMtdvQ/QAAAABJRU5ErkJggg==";

    //Boundaries Class Created To Deal With Boundaries Where Players Cant Move Over
    class Boundary {
      static width = 64;
      static height = 64;

      constructor({ position }) {
        this.position = position;
        this.width = 64;
        this.height = 64;
      }

      draw() {
        ctx.fillStyle = "rgba(255, 0, 0, 0)";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
      }
    }

    const boundaries = [];

    //All Collision Tiles
    collisionsMap.forEach((row, i) => {
      row.forEach((symbol, j) => {
        if (symbol === 4247) {
          boundaries.push(
            new Boundary({
              position: {
                x: j * Boundary.width + offset.x,
                y: i * Boundary.height + offset.y,
              },
            })
          );
        }
      });
    });

    //All Navigate Tiles For Shop
    const shopNavigateTiles = [];

    shopNavigate.forEach((row, i) => {
      row.forEach((symbol, j) => {
        if (symbol === 4247) {
          shopNavigateTiles.push(
            new Boundary({
              position: {
                x: j * Boundary.width + offset.x,
                y: i * Boundary.height + offset.y,
              },
            })
          );
        }
      });
    });

    //All Navigate Tiles For Forum
    const forumNavigateTiles = [];

    forumNavigate.forEach((row, i) => {
      row.forEach((symbol, j) => {
        if (symbol === 4247) {
          forumNavigateTiles.push(
            new Boundary({
              position: {
                x: j * Boundary.width + offset.x,
                y: i * Boundary.height + offset.y,
              },
            })
          );
        }
      });
    });

    //All Navigate Tiles For Forum
    const minigameNavigateTiles = [];

    minigameNavigate.forEach((row, i) => {
      row.forEach((symbol, j) => {
        if (symbol === 4247) {
          minigameNavigateTiles.push(
            new Boundary({
              position: {
                x: j * Boundary.width + offset.x,
                y: i * Boundary.height + offset.y,
              },
            })
          );
        }
      });
    });

    //All Navigate Tiles For Shop Signboard
    const shopPopupTiles = [];

    shopPopup.forEach((row, i) => {
      row.forEach((symbol, j) => {
        if (symbol === 4247) {
          shopPopupTiles.push(
            new Boundary({
              position: {
                x: j * Boundary.width + offset.x,
                y: i * Boundary.height + offset.y,
              },
            })
          );
        }
      });
    });

    const aboutPopupTiles = [];

    aboutPopup.forEach((row, i) => {
      row.forEach((symbol, j) => {
        if (symbol === 4247) {
          aboutPopupTiles.push(
            new Boundary({
              position: {
                x: j * Boundary.width + offset.x,
                y: i * Boundary.height + offset.y,
              },
            })
          );
        }
      });
    });

    //All Navigate Tiles For Forum Signboard
    const minigamePopupTiles = [];

    minigamePopup.forEach((row, i) => {
      row.forEach((symbol, j) => {
        if (symbol === 4247) {
          minigamePopupTiles.push(
            new Boundary({
              position: {
                x: j * Boundary.width + offset.x,
                y: i * Boundary.height + offset.y,
              },
            })
          );
        }
      });
    });

    const leaderboardPopupTiles = [];

    leaderboardPopup.forEach((row, i) => {
      row.forEach((symbol, j) => {
        if (symbol === 4247) {
          leaderboardPopupTiles.push(
            new Boundary({
              position: {
                x: j * Boundary.width + offset.x,
                y: i * Boundary.height + offset.y,
              },
            })
          );
        }
      });
    });

    const websiteNavigateTiles = [];

    websiteNavigate.forEach((row, i) => {
      row.forEach((symbol, j) => {
        if (symbol === 4247) {
          websiteNavigateTiles.push(
            new Boundary({
              position: {
                x: j * Boundary.width + offset.x,
                y: i * Boundary.height + offset.y,
              },
            })
          );
        }
      });
    });

    const logoutNavigateTiles = [];

    logoutNavigate.forEach((row, i) => {
      row.forEach((symbol, j) => {
        if (symbol === 4247) {
          logoutNavigateTiles.push(
            new Boundary({
              position: {
                x: j * Boundary.width + offset.x,
                y: i * Boundary.height + offset.y,
              },
            })
          );
        }
      });
    });

    //Sprite Class Creating Sprites Such As Players, Map etc.
    class Sprite {
      constructor({ position, velocity, image, frames = { max: 1 }, sprites }) {
        this.position = position;
        this.image = image;
        this.frames = { ...frames, val: 0, elapsed: 0 };

        this.image.onload = () => {
          this.width = this.image.width / this.frames.max;
          this.height = this.image.height;
        };
        this.moving = false;
        this.sprites = sprites;
      }

      draw() {
        ctx.drawImage(
          this.image,
          this.frames.val * this.width,
          0,
          this.image.width / this.frames.max, //Crop X
          this.image.height, //Crop Y
          this.position.x,
          this.position.y,
          this.image.width / this.frames.max,
          this.image.height
        );

        if (this.moving) {
          if (this.frames.max > 1) this.frames.elapsed++;

          if (this.frames.elapsed % 10 === 0) {
            if (this.frames.val < this.frames.max - 1) this.frames.val++;
            else this.frames.val = 0;
          }
        }
      }
    }

    let playerPosX = 750;
    let playerPosY = 440;
    let directionPlayerFace = playerImage;

    //If User Leaves Shop Set Position
    if (leaveShop || leaveForum || leaveDungeon) {
      directionPlayerFace = playerImageDown;
    }

    // Player Configuration
    const player = new Sprite({
      position: {
        x: playerPosX, //Player Pos On X Axis
        y: playerPosY, // Player Pos On Y Axis
      },
      image: directionPlayerFace, //Loading Player Image
      frames: {
        max: 4,
      },
      sprites: {
        up: playerImage,
        down: playerImageDown,
        left: playerImageLeft,
        right: playerImageRight,
      },
    });

    // Game Scene Configuration
    const gameScene = new Image();
    gameScene.src = require("./map.png");
    console.log(offset.y);
    const gameSceneLayer = new Sprite({
      position: {
        x: offset.x,
        y: offset.y,
      },
      image: gameScene, //Loading Map Image
    });

    //Foreground Image
    const gameSceneForegroundImage = new Image();
    gameSceneForegroundImage.src = require("./foregroundObjects.png");
    const gameSceneForegroundLayer = new Sprite({
      position: {
        x: offset.x,
        y: offset.y,
      },
      image: gameSceneForegroundImage, //Loading Map Image
    });

    const checkCollision = ({ player, boundary }) => {
      return (
        player.position.x + player.width >= boundary.position.x &&
        player.position.x <= boundary.position.x + boundary.width &&
        player.position.y <= boundary.position.y + boundary.height &&
        player.position.y + player.height >= boundary.position.y
      );
    };

    const moveables = [
      gameSceneLayer,
      ...boundaries,
      gameSceneForegroundLayer,
      ...shopNavigateTiles,
      ...forumNavigateTiles,
      ...minigameNavigateTiles,
      ...shopPopupTiles,
      ...minigamePopupTiles,
      ...aboutPopupTiles,
      ...leaderboardPopupTiles,
      ...websiteNavigateTiles,
      ...logoutNavigateTiles,
    ];

    function animate() {
      const animationID = window.requestAnimationFrame(animate);
      gameSceneLayer.draw(); //Draw Game Map Onto Canvas

      //All Boundaries PLayers Cannot Walk Over
      boundaries.forEach((boundary) => {
        boundary.draw();
      });

      //All Navigation Tiles Players Walk Over To Enter Shop
      shopNavigateTiles.forEach((navigateZone) => {
        navigateZone.draw();
      });

      //All Navigation Tiles Players Walk Over To Enter Forums
      forumNavigateTiles.forEach((navigateZone) => {
        navigateZone.draw();
      });

      minigameNavigateTiles.forEach((navigateZone) => {
        navigateZone.draw();
      });

      websiteNavigateTiles.forEach((navigateZone) => {
        navigateZone.draw();
      });

      //All Navigation Tiles Players Walk Over For Shop Sign Board Popup
      shopPopupTiles.forEach((navigateZone) => {
        navigateZone.draw();
      });

      //All Navigation Tiles Players Walk Over For Forum Sign Board Popup
      minigamePopupTiles.forEach((navigateZone) => {
        navigateZone.draw();
      });

      aboutPopupTiles.forEach((navigateZone) => {
        navigateZone.draw();
      });

      leaderboardPopupTiles.forEach((navigateZone) => {
        navigateZone.draw();
      });

      logoutNavigateTiles.forEach((navigateZone) => {
        navigateZone.draw();
      });

      player.draw(); //Draw Player Onto Canvas

      gameSceneForegroundLayer.draw();

      let moving = true;
      player.moving = false;

      if (
        keys.w.pressed ||
        keys.a.pressed ||
        keys.s.pressed ||
        keys.d.pressed ||
        keys.W.pressed ||
        keys.A.pressed ||
        keys.S.pressed ||
        keys.D.pressed ||
        keys.ArrowDown.pressed ||
        keys.ArrowUp.pressed ||
        keys.ArrowLeft.pressed ||
        keys.ArrowRight.pressed
      ) {
        for (let i = 0; i < shopNavigateTiles.length; i++) {
          const navigateZone = shopNavigateTiles[i];
          const overlappingArea =
            (Math.min(
              player.position.x + player.width,
              navigateZone.position.x + navigateZone.width
            ) -
              Math.max(player.position.x, navigateZone.position.x)) *
            (Math.min(
              player.position.y + player.height,
              navigateZone.position.y + navigateZone.height
            ) -
              Math.max(player.position.y, navigateZone.position.y));
          if (
            checkCollision({
              player: player,
              boundary: navigateZone,
            }) &&
            overlappingArea > (player.width * player.height) / 2
          ) {
            navigate("/shop", { replace: true });
            window.cancelAnimationFrame(animationID);
            break;
          }
        }

        for (let i = 0; i < websiteNavigateTiles.length; i++) {
          const navigateZone = websiteNavigateTiles[i];
          const overlappingArea =
            (Math.min(
              player.position.x + player.width,
              navigateZone.position.x + navigateZone.width
            ) -
              Math.max(player.position.x, navigateZone.position.x)) *
            (Math.min(
              player.position.y + player.height,
              navigateZone.position.y + navigateZone.height
            ) -
              Math.max(player.position.y, navigateZone.position.y));
          if (
            checkCollision({
              player: player,
              boundary: navigateZone,
            }) &&
            overlappingArea > (player.width * player.height) / 2
          ) {
            window.location.replace("https://www.getfutureproof.co.uk/");
            window.cancelAnimationFrame(animationID);
            break;
          }
        }

        for (let i = 0; i < aboutPopupTiles.length; i++) {
          const navigateZone = aboutPopupTiles[i];
          const overlappingArea =
            (Math.min(
              player.position.x + player.width,
              navigateZone.position.x + navigateZone.width
            ) -
              Math.max(player.position.x, navigateZone.position.x)) *
            (Math.min(
              player.position.y + player.height,
              navigateZone.position.y + navigateZone.height
            ) -
              Math.max(player.position.y, navigateZone.position.y));
          if (
            checkCollision({
              player: player,
              boundary: navigateZone,
            }) &&
            overlappingArea > (player.width * player.height) / 2
          ) {
            setWhichModal("about");
            setIsOpen(true);
            break;
          } else {
            // setIsOpen(false);
          }
        }

        for (let i = 0; i < leaderboardPopupTiles.length; i++) {
          const navigateZone = leaderboardPopupTiles[i];
          const overlappingArea =
            (Math.min(
              player.position.x + player.width,
              navigateZone.position.x + navigateZone.width
            ) -
              Math.max(player.position.x, navigateZone.position.x)) *
            (Math.min(
              player.position.y + player.height,
              navigateZone.position.y + navigateZone.height
            ) -
              Math.max(player.position.y, navigateZone.position.y));
          if (
            checkCollision({
              player: player,
              boundary: navigateZone,
            }) &&
            overlappingArea > (player.width * player.height) / 2
          ) {
            setWhichModal("leaderboard");
            setIsOpen(true);
            break;
          } else {
            // setIsOpen(false);
          }
        }

        for (let i = 0; i < minigameNavigateTiles.length; i++) {
          const navigateZone = minigameNavigateTiles[i];
          const overlappingArea =
            (Math.min(
              player.position.x + player.width,
              navigateZone.position.x + navigateZone.width
            ) -
              Math.max(player.position.x, navigateZone.position.x)) *
            (Math.min(
              player.position.y + player.height,
              navigateZone.position.y + navigateZone.height
            ) -
              Math.max(player.position.y, navigateZone.position.y));
          if (
            checkCollision({
              player: player,
              boundary: navigateZone,
            }) &&
            overlappingArea > (player.width * player.height) / 2
          ) {
            navigate("/game", { replace: true });
            window.cancelAnimationFrame(animationID);
            break;
          }
        }

        for (let i = 0; i < minigamePopupTiles.length; i++) {
          const navigateZone = minigamePopupTiles[i];
          const overlappingArea =
            (Math.min(
              player.position.x + player.width,
              navigateZone.position.x + navigateZone.width
            ) -
              Math.max(player.position.x, navigateZone.position.x)) *
            (Math.min(
              player.position.y + player.height,
              navigateZone.position.y + navigateZone.height
            ) -
              Math.max(player.position.y, navigateZone.position.y));
          if (
            checkCollision({
              player: player,
              boundary: navigateZone,
            }) &&
            overlappingArea > (player.width * player.height) / 2
          ) {
            setWhichModal("dungeon");
            setIsOpen(true);
            break;
          } else {
            // setIsOpen(false);
          }
        }

        for (let i = 0; i < shopPopupTiles.length; i++) {
          const navigateZone = shopPopupTiles[i];
          const overlappingArea =
            (Math.min(
              player.position.x + player.width,
              navigateZone.position.x + navigateZone.width
            ) -
              Math.max(player.position.x, navigateZone.position.x)) *
            (Math.min(
              player.position.y + player.height,
              navigateZone.position.y + navigateZone.height
            ) -
              Math.max(player.position.y, navigateZone.position.y));
          if (
            checkCollision({
              player: player,
              boundary: navigateZone,
            }) &&
            overlappingArea > (player.width * player.height) / 2
          ) {
            setWhichModal("shop");
            setIsOpen(true);
            break;
          } else {
            // setIsOpen(false);
          }
        }

        for (let i = 0; i < forumNavigateTiles.length; i++) {
          const navigateZone = forumNavigateTiles[i];
          const overlappingArea =
            (Math.min(
              player.position.x + player.width,
              navigateZone.position.x + navigateZone.width
            ) -
              Math.max(player.position.x, navigateZone.position.x)) *
            (Math.min(
              player.position.y + player.height,
              navigateZone.position.y + navigateZone.height
            ) -
              Math.max(player.position.y, navigateZone.position.y));
          if (
            checkCollision({
              player: player,
              boundary: navigateZone,
            }) &&
            overlappingArea > (player.width * player.height) / 2
          ) {
            navigate("/forum", { replace: true });
            window.cancelAnimationFrame(animationID);
            break;
          }
        }

        for (let i = 0; i < logoutNavigateTiles.length; i++) {
          const navigateZone = logoutNavigateTiles[i];
          const overlappingArea =
            (Math.min(
              player.position.x + player.width,
              navigateZone.position.x + navigateZone.width
            ) -
              Math.max(player.position.x, navigateZone.position.x)) *
            (Math.min(
              player.position.y + player.height,
              navigateZone.position.y + navigateZone.height
            ) -
              Math.max(player.position.y, navigateZone.position.y));
          if (
            checkCollision({
              player: player,
              boundary: navigateZone,
            }) &&
            overlappingArea > (player.width * player.height) / 2
          ) {
            setWhichModal("logout");
            setIsOpen(true);
            break;
          }
        }
      }
      if (
        keys.ArrowDown.pressed ||
        keys.S.pressed ||
        (keys.s.pressed && lastKeyDown === "ArrowDown")
      ) {
        // Player Movement When Keys Are Pressed
        player.moving = true;
        player.image = player.sprites.down;
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          //Checks For Collision With Player Sprite
          if (
            checkCollision({
              player: player,
              boundary: {
                ...boundary,
                position: {
                  x: boundary.position.x,
                  y: boundary.position.y - 3,
                },
              },
            })
          ) {
            moving = false;
            break;
          }
        }
        if (moving) {
          moveables.forEach((movable) => {
            movable.position.y -= 3;
          }); // Move Down
        }
      } else if (
        keys.ArrowUp.pressed ||
        keys.W.pressed ||
        (keys.w.pressed && lastKeyDown === "ArrowUp")
      ) {
        playerImageDown = playerImage;
        player.image = playerImage;
        player.moving = true;
        player.image = player.sprites.up;
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          //Checks For Collision With Player Sprite
          if (
            checkCollision({
              player: player,
              boundary: {
                ...boundary,
                position: {
                  x: boundary.position.x,
                  y: boundary.position.y + 3,
                },
              },
            })
          ) {
            moving = false;
            break;
          }
        }

        if (moving) {
          moveables.forEach((movable) => {
            movable.position.y += 3;
          }); // Move Up
        }
      } else if (
        keys.ArrowRight.pressed ||
        keys.D.pressed ||
        (keys.d.pressed && lastKeyDown === "ArrowRight")
      ) {
        player.moving = true;
        player.image = player.sprites.right;
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          //Checks For Collision With Player Sprite
          if (
            checkCollision({
              player: player,
              boundary: {
                ...boundary,
                position: {
                  x: boundary.position.x - 3,
                  y: boundary.position.y,
                },
              },
            })
          ) {
            moving = false;
            break;
          }
        }
        if (moving) {
          moveables.forEach((movable) => {
            movable.position.x -= 3;
          }); // Move Left
        }
      } else if (
        keys.ArrowLeft.pressed ||
        keys.A.pressed ||
        (keys.a.pressed && lastKeyDown === "ArrowLeft")
      ) {
        player.moving = true;
        player.image = player.sprites.left;
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          //Checks For Collision With Player Sprite
          if (
            checkCollision({
              player: player,
              boundary: {
                ...boundary,
                position: {
                  x: boundary.position.x + 3,
                  y: boundary.position.y,
                },
              },
            })
          ) {
            moving = false;
            break;
          }
        }
        if (moving) {
          moveables.forEach((movable) => {
            movable.position.x += 3;
          }); // Move Right
        }
      }
    }

    animate();
  }, [draw, height, width]);

  return (
    <>
      <canvas ref={canvas} height={height} width={width} />
      <GameModal
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        whichModal={whichModal}
        setWhichModal={setWhichModal}
      />
    </>
  );
};

Dashboard.propTypes = {
  draw: PropTypes.func.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

export default Dashboard;
