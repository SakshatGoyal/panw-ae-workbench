You are composing UI for $ARGUMENTS. Other Claude Code sessions may be working in parallel on other compositions in this folder.
Your file
You own exactly one file: poc-exploration/src/compositions/$ARGUMENTS.stories.tsx
Create it if missing. Edit it if it exists.

Workflow
1. Create the composition file from the template.
2. Commit immediately:
   `git add poc-exploration/src/compositions/$ARGUMENTS.stories.tsx && git commit -m "Composition: $ARGUMENTS (WIP)"`
   Non-negotiable. Untracked files can be lost to cleanup from parallel sessions — this rule shrinks the vulnerability window from hours to seconds.
3. Iterate. Use `git commit --amend --no-edit` to update the WIP commit, or create new commits for milestones.
4. When the user signals the round is complete, drop the `(WIP)` suffix:
   `git commit --amend -m "Composition: $ARGUMENTS"`

Story file template
If creating new, use this exactly. The title and Default export name are what make the screenshot URL work.
tsximport type { Meta, StoryObj } from '@storybook/react'

const meta: Meta = { title: 'compositions/$ARGUMENTS' }
export default meta

export const Default: StoryObj = {
  render: () => (
    <div>placeholder</div>
  )
}
Your screenshot URL
http://localhost:38274/?path=/story/compositions-$ARGUMENTS--default
Never screenshot any other URL.
Lane discipline
Do not edit any other composition file, package.json, vite.config.ts, system.scss, .storybook/*, or anything in design-system/. If you see other agents' files appear or commits land, ignore them.
Design system rules (allowed imports, forbidden patterns) live in the guidelines file. Follow them.