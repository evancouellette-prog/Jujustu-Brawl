# Alternating punches and online responsiveness

Basic light/heavy punches now select one arm when an attack starts. Rejected inputs do not advance the sequence. The other arm stays tucked in guard, fixed-length upper arms and forearms bend through one elbow branch, and the arms follow the same hip pivot as the torso. Ryuk follows the same alternating sequence for Light's melee and Shinigami Strike.

Heian Sukuna (`shrine/default`) cycles upper right, upper left, lower right, lower left. His light attack uses 1 startup / 4 active / 4 recovery ticks; heavy uses 4 / 5 / 6. His post-combo cooldown is 20 ticks. The existing six-hit barrage uses one arm per damage tick, at three-tick intervals, and ends after 24 ticks. Damage and hit count are preserved. Shibuya keeps two arms and its existing timing. Sanji's kicks and weapon attacks keep their existing move types.

Online changes:

- Remote movement and basic punch poses advance between snapshots, with bounded prediction and smoothing of small corrections. Teleports and large corrections snap. Rendering restores the original fighter state before gameplay runs.
- Skin and punch-arm state are carried to both players.
- Obsolete socket callbacks cannot disconnect or change the role of a replacement connection. Invalid/full rooms return specific errors. Socket errors and connection timeouts have a recovery message.
- Room membership is cleaned up on disconnect and heartbeat failure. Names, selected characters, skins and stage settings are replayed to arriving players. A departed peer resets the remaining player's ready phase.
- Large WebSocket messages use bounded, low-level compression. Congested receivers retain only the latest full movement snapshot; discrete attacks, releases, damage and ready messages remain reliable.
- Cooldown HUD rows are reused instead of recreated every frame. Character-select previews refresh at 10 Hz.

Validation: 25 automated tests pass, including real local WebSocket host/join connections, wrong/full rooms, metadata replay, rejoining a vacated slot, backlog behavior, stale connection events, fixed arm lengths, first-damage-frame contact, four-arm cycling, skin synchronization and the earlier Light regressions. In a local 40-snapshot sample, about 208 KB of JSON used about 47 KB on the receiving socket (roughly 77% less). This measures transport bytes, not end-to-end Internet latency. Syntax and whitespace checks also pass. No additional browser playtest was run, as requested.

This improves application-induced stutter and connection handling; it cannot eliminate network latency or hosting cold starts. Both players should refresh after deployment so they run the same code.
