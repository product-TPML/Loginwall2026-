# Login nudge prototype

Open `index.html` in a browser. No installation or server is required.

- Switch between Deccan Herald and Prajavani using the prototype controls.
- Use the **V1 / V2 / V3** toggle to compare inline login walls: **V1** has mobile entry and benefits; **V2** has a login button and benefits; **V3** has a login button without the benefits panel. V2 and V3 open the existing login modal. The selected version stays selected when switching brands, themes, or restarting.
- The first article is already open. The bottom sheet shows two articles remaining.
- Use **Read next article** to finish the three-article allowance. Article four keeps its opening half visible, fades the preview into an inline login wall, and hides the remaining paragraphs until login.
- The wall stays inside the article on desktop and mobile. Its login button opens the desktop popup or mobile bottom sheet; closing that form leaves the article locked. Successful login reveals the remaining text.
- Log in using a valid Indian mobile number and demo OTP **123456**. No SMS is sent.
- Email uses the same demo verification code. Google offers an explicitly simulated sign-in.
- Use **Restart** to return to the guest experience.
- At widths of 720px or below, login becomes a bottom sheet. Desktop uses a popup.

This is a browser-local interaction prototype, not production authentication or access control. Refreshing resets the session. Prajavani includes Kannada sample headlines and article text; authentication copy is currently English.

The supplied Figma file informed the colors, split login layout, counter, and dark login wall. Network restrictions prevented downloading its original artwork, so logos and decorative artwork are approximations. JavaScript syntax and state transitions were checked; rendered desktop/mobile browser verification could not be completed in this environment.
