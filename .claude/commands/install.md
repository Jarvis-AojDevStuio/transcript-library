Run `/prime` first to orient yourself.

Then read `.claude/hooks/setup.init.log` and analyze the setup results:

1. Check if bun install succeeded
2. Identify any errors or warnings
3. Write a summary to `app_docs/install_results.md` with:
   - Installation status (success/failure)
   - Dependencies installed
   - Any warnings or issues found
   - Next steps for the developer
4. Report the results to the user

If the argument `$ARGUMENTS` is `true`, delegate to `/install-hil` for interactive mode.
