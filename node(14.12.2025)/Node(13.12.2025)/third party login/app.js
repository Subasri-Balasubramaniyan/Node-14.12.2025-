const express = require("express");
const passport = require("passport");
const session = require("express-session");
require("dotenv").config();

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;

const app = express();

/* ---------------- SESSION SETUP ---------------- */
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

/* ---------------- PASSPORT SETUP ---------------- */
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

/* ---------------- GOOGLE STRATEGY ---------------- */
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

/* ---------------- GITHUB STRATEGY ---------------- */
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

/* ---------------- ROUTES ---------------- */

// Google Login
app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get("/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/profile",
    failureRedirect: "/",
  })
);

// GitHub Login
app.get("/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

app.get("/auth/github/callback",
  passport.authenticate("github", {
    successRedirect: "/profile",
    failureRedirect: "/",
  })
);

// Protected Profile Page
app.get("/profile", (req, res) => {
  if (!req.user) return res.redirect("/");
  res.send(`
    <h1>Welcome ${req.user.displayName || req.user.username}</h1>
    <pre>${JSON.stringify(req.user, null, 2)}</pre>
    <a href="/logout">Logout</a>
 `);
});

// Logout
app.get("/logout", (req, res) => {
  req.logout(() => {
    req.session.destroy();
    res.redirect("/");
  });
});

// Home
app.get("/", (req, res) => {
  res.send(`
    <h2>Third-Party Login</h2>
    <a href="/auth/google">Login with Google</a><br/><br/>
    <a href="/auth/github">Login with GitHub</a>
  `);
});

app.listen(3000, () =>
  console.log("Server running at http://localhost:3000")
);
