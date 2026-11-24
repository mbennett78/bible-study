import { test } from "node:test";
import assert from "node:assert/strict";
import { buddyCommand, BUDDY_ACTIONS } from "../../js/buddy.js";

test("Buddy does what he's asked, and leaves Bible questions to the helper", () => {
  const cases = {
    "Can you jump rope?": "jumprope", "jump": "jump", "Buddy, dance!": "dance", "do a cartwheel please": "cartwheel",
    "Hey Sunny can you do a backflip for me?": "cartwheel", "Do a trick!": "trick", "Play catch with me!": "ball",
    "give me a hug": "hug", "take a nap": "nap", "Wave!": "wave", "roll on the floor": "laugh",
    "Why did David dance before the LORD?": null, "what does jump mean in hebrew": null, "read john 3": null,
    "Can you pray for my grandma?": null, "Tell me about yourself": null,
  };
  for (const [q, want] of Object.entries(cases)) assert.equal(buddyCommand(q, "Sunny"), want, q);
});

test("every action has something to say", () => {
  for (const [k, a] of Object.entries(BUDDY_ACTIONS)) assert.ok(a.say.length > 0, k);
});
