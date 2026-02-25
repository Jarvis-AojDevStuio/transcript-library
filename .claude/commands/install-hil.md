Human-in-the-loop installation mode.

Before executing installation steps, ask the user about their preferences:

1. Use AskUserQuestion to ask about environment setup:
   - Fresh install or update existing?
   - Should we verify environment variables in .env.local?
   - Run type checking after install?

2. Execute installation based on user responses
3. Read `.claude/hooks/setup.init.log` for hook results
4. Write results to `app_docs/install_results.md`
5. Report to user with findings and recommendations
