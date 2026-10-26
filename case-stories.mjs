// Project-specific narratives. Sources and limits are recorded in docs/case-study-evidence.md.
export const storyOutlines={
 kobospend:[['context','01 Money with a schedule'],['decisions','02 Two actions, two balances'],['experience-design','03 From intent to a funded plan'],['operations','04 Beyond the ideal path'],['outcome','05 What to validate next']],
 consto:[['context','01 The reason I built it'],['decisions','02 Less planning before doing'],['experience-design','03 Starting, focusing, returning'],['scope','04 Keeping the MVP focused'],['outcome','05 Shipped, then what?']]
};
export function renderStory(p,{esc,figure}){
 const section=(id,kicker,title,content)=>`<section id="${id}" class="case-section"><p class="eyebrow">${kicker}</p><h2>${title}</h2>${content}</section>`;
 const note=(label,text)=>`<aside class="evidence-note"><span class="eyebrow">${label}</span><p>${text}</p></aside>`;
 const panel=(label,title,text)=>`<article class="story-panel"><p class="eyebrow">${label}</p><h3>${title}</h3><p>${text}</p></article>`;
 const table=(headers,rows)=>`<div class="story-table-wrap"><table class="story-table"><thead><tr>${headers.map(x=>`<th scope="col">${x}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map((x,i)=>i?`<td>${x}</td>`:`<th scope="row">${x}</th>`).join('')}</tr>`).join('')}</tbody></table></div>`;
 const steps=(copy)=>`<div class="story-steps">${p.flow.map(([title,src],i)=>`<article class="story-step"><div><p class="eyebrow">${String(i+1).padStart(2,'0')} / ${esc(title)}</p><h3>${copy[i][0]}</h3><p>${copy[i][1]}</p>${note('Design trade-off',copy[i][2])}</div>${figure(src,title,true)}</article>`).join('')}</div>`;
 if(p.slug==='kobospend')return section('context','01 / The product question','A budget tells you the limit.<br><em>When can you use it?</em>',`
 <p class="large-copy">KoboSpend is built around money someone has already decided to spend. The product hypothesis is that scheduled access can help that amount last through a chosen period.</p>
 <p>That creates a different design problem from displaying a monthly budget: the interface has to explain what is accessible now, what remains reserved, and when that changes.</p>
 <div class="story-panels">${panel('My responsibility','The experience across surfaces','Sole product designer for the mobile and desktop experience, working with a backend cofounder. My scope includes plan creation, balances, funding, withdrawals, account management and back-office workflows.')}${panel('Product hypothesis','Pace access to planned spending','The design assumes that making only the scheduled amount available will support spending discipline. That behavioural benefit still needs validation with people using the product.')}</div>
 ${note('Current stage','Pre-launch product design. The walkthrough shows original screens with illustrative amounts and dates; the captures are not a single transaction record.')}`)
 +section('decisions','02 / The central design decision','A release is not<br><em>a withdrawal.</em>',`
 <p class="large-copy">The product brief separates two events: a scheduled release moves money into an available balance; a withdrawal moves available money to a bank account.</p>
 <p>The dashboard therefore gives money available today the strongest hierarchy, while keeping the locked balance and next release visible. A total balance alone would leave the immediate spending boundary unexplained.</p>
 <div class="money-model" aria-label="Money movement model"><div><span class="eyebrow">Reserved</span><strong>Locked money</strong><p>Waiting for the chosen release time.</p></div><div><span class="eyebrow">Scheduled release</span><strong>Available to withdraw</strong><p>Accessible in the product; still a separate step from a bank transfer.</p></div><div><span class="eyebrow">User-initiated withdrawal</span><strong>Bank account</strong><p>The destination for money the user chooses to withdraw.</p></div></div>
 ${figure('kobospend/desktop.webp','Dashboard showing available money, locked funds and the next release')}
 ${note('Trade-off in this design','Separating balances explains access more precisely, but asks the user to learn two money states. The labels and next-release information must do that work without a tutorial.')}
 <h3>Why this matters beyond the dashboard</h3><p>The distinction also affects confirmation copy, transaction history and support. A release completing cannot be described as money arriving in a bank account.</p>`)
 +section('experience-design','03 / The commitment journey','Make the rules understandable<br><em>before funding.</em>',`
 <p class="section-lead">The design separates amount, schedule, review and funding. Each step answers a different question about the commitment.</p>
 ${steps([
 ['How much am I committing?','The amount screen introduces the commitment and locking explanation together. This is the point to establish that the full amount will not remain immediately accessible.','Adding explanation helps informed commitment, but increases the reading required before a plan exists.'],
 ['When will it become available?','The schedule makes dates, times and amounts explicit. The brief supports daily, weekly, twice-monthly and custom release patterns.','Custom scheduling gives control, while increasing configuration and validation work. A successful setup must still account for the whole plan amount.'],
 ['Is this the plan I intended?','Review gives the user a checkpoint before the separate funding action. Amount, schedule and the cost of the commitment belong here.','A review step adds time. Its purpose is to make a consequential money decision inspectable before payment.'],
 ['When does the commitment become active?','Funding follows the definition and review of the plan. The experience needs a clear distinction between a drafted plan and a funded commitment.','Payment introduces pending and failed states; designing the successful funding screen alone does not resolve them.']
 ])}
 <div class="detail-feature"><div><p class="eyebrow">A rule at the point of correction</p><h3>What if the schedule does not add up?</h3><p>The brief requires scheduled releases to equal the plan amount. This screen explains the unallocated remainder beside Continue, giving a reason and a correction path.</p><p>The usability question is whether someone can fix it without guessing which entry is wrong.</p></div>${figure('kobospend/under.webp','Unallocated amount validation in release scheduling',true)}</div>`)
 +section('operations','04 / Systems thinking','The promise has to survive<br><em>a failed transaction.</em>',`
 <p class="large-copy">A clear plan is only the beginning. Releases, withdrawals and support need to describe the same money state.</p>
 <p>My scope includes back-office workflows. The following are evaluation and implementation questions for that wider system, rather than claims that the failure paths have already been proven.</p>
 ${table(['Moment','Question the experience must answer'],[
 ['A release does not complete','What remains locked, what status is visible, and how can support identify the affected release?'],
 ['A bank withdrawal is pending or fails','Where is the money now, and when is retrying safe without creating a duplicate transfer?'],
 ['Someone needs money early','What changes in the plan, what does access cost, and what will the person receive before confirming?']
 ])}
 ${note('Working boundary','I own the experience design; backend implementation is a shared dependency with my cofounder. Final transaction behaviour needs agreement across the user interface, service logic and support workflow.')}`)
 +section('outcome','05 / Delivery and evaluation','A defined experience.<br><em>A hypothesis still to test.</em>',`
 <p>The current design covers the core plan journey across mobile and desktop. The next milestone is to validate comprehension and recovery before treating the interface as evidence of changed financial behaviour.</p>
 <h3>Proposed evaluation</h3>
 ${table(['Task','What I would observe'],[
 ['Explain the dashboard without guidance','Can the participant distinguish accessible money, locked funds and the next release?'],
 ['Create and correct a release schedule','Can they notice the unallocated amount and resolve it without assistance?'],
 ['Review a plan before funding','Can they explain when money becomes available and what happens after funding?'],
 ['Interpret a pending withdrawal','Can they describe where the money is and identify a safe next action?']
 ])}
 <p class="story-caption">Planned tasks and observation criteria—not completed research or measured results.</p>
 <blockquote>The central design challenge is making a restriction feel understandable before someone commits money to it.</blockquote>`);
 if(p.slug==='consto')return section('context','01 / The starting point','Starting was easier<br><em>than finishing.</em>',`
 <p class="large-copy">I built Consto because I struggled to follow through on my own goals and tasks. I wanted accountability that reached beyond writing another to-do list.</p>
 <p>That personal experience gave me a reason to build. It did not establish that everyone has the same problem. The original brief narrowed the MVP to active job seekers: an audience with concrete, repeated work such as applications, preparation and follow-ups.</p>
 <div class="story-panels">${panel('Ownership','Designer, builder and product owner','I shaped the experience and built the working web application using AI-assisted development. The screens below come from the shipped product.')}${panel('Product question','What happens after making a plan?','The design connects a commitment to a start action, an active work session and a way to adjust the plan when the day changes.')}</div>
 ${note('Evidence available','Consto is live. The walkthrough demonstrates implemented behaviour; sustained use and improved follow-through are still open evaluation questions.')}`)
 +section('decisions','02 / A deliberate scope choice','A task should not require<br><em>a planning system.</em>',`
 <p class="large-copy">The original brief explicitly keeps goals optional and excludes a monthly → weekly → daily hierarchy. The task is the unit of action.</p>
 <p>That choice makes it possible to schedule a specific piece of work without first building a larger plan. A goal can provide context when useful, rather than becoming a prerequisite.</p>
 ${figure('consto/task.webp','Create a concrete task with measurement and time',true)}
 ${table(['Choice in the design','Benefit intended','Trade-off'],[
 ['Optional goal','Allow someone to begin with one concrete task.','Less structure for people who want detailed long-term planning.'],
 ['A task with a measure and time','Make the commitment specific enough to act on.','More input than a quick text-only to-do item.'],
 ['An explicit start action','Separate planning work from beginning work.','Another interaction that must justify its place in the flow.']
 ])}
 <p class="story-caption">These are rationale and trade-offs in the documented design, not findings from a comparison test.</p>`)
 +section('experience-design','03 / The working experience','A plan needs a start.<br><em>A changed day needs a return.</em>',`
 <p class="section-lead">The shipped flow lets me inspect how the decisions behave together, from defining a task to adjusting its time.</p>
 ${steps([
 ['Define something actionable.','A commitment connects the work to a measure and a scheduled time. The intended benefit is clarity about what doing the task means.','Specificity supports a clear commitment, but setup effort can delay the first useful action.'],
 ['Make beginning explicit.','The task has a distinct starting point. Creating a plan and beginning the work are represented as different moments.','A start control can make intent visible; it cannot establish that meaningful work took place.'],
 ['Prioritize the current session.','The active view emphasizes the task and remaining time, with pause and completion controls close by.','A focused session is easier to scan, but other planning information becomes less prominent.'],
 ['Support a changed plan.','Rescheduling is available when the original time no longer works. The next action can remain explicit even when the schedule changes.','Rescheduling can support recovery, but repeated postponement could also avoid the work. Return behaviour needs observation.']
 ])}`)
 +section('scope','04 / Product and implementation','A focused brief.<br><em>A working product.</em>',`
 <p class="large-copy">The original brief gave the MVP a boundary: help job seekers follow through, rather than build a complete productivity suite.</p>
 ${table(['Documented scope decision','Why it matters'],[
 ['Job seekers as the first audience','Applications, preparation and outreach provide concrete tasks around which to frame the experience. Other audiences were future expansion in the brief.'],
 ['Simple goals and tasks','The brief excludes a nested planning hierarchy, keeping the path to an actionable task short.'],
 ['Accountability through rules and event history','The original MVP specification describes rules and parameterized messaging. AI-assisted development does not mean the product itself uses reasoning AI.']
 ])}
 <h3>What shipping lets me examine</h3><p>The implementation makes task creation, session controls and rescheduling available as one experience. That provides a basis for observing hesitation and recovery in use, rather than judging disconnected static screens.</p>
 ${note('Brief versus delivery','The scope choices above come from the original Buddy brief, before the product was named Consto. The walkthrough shows the selected shipped flow; it does not claim every requirement in that brief has been verified in production.')}`)
 +section('outcome','05 / What comes after shipping','The product is live.<br><em>The behaviour is the next question.</em>',`
 <p>Designing and building Consto established a working product I can put in front of people. The next useful evidence is whether the journey helps them begin work and return after a changed plan.</p>
 <h3>Proposed evaluation</h3>
 ${table(['Question','Evidence to collect'],[
 ['Can someone get to a useful first task?','Observe creation without a goal; record hesitations and requests for help.'],
 ['Where does a planned task lose momentum?','Observe the transition from task creation to starting a session.'],
 ['Does rescheduling help someone return?','Follow what happens after the new time, alongside the person’s explanation.'],
 ['Does the product remain useful beyond the first visit?','Look at return use and repeated task follow-through, with user consent and a defined observation period.']
 ])}
 <p class="story-caption">An evaluation plan. No retention or productivity improvement is claimed.</p>
 <blockquote>My own difficulty supplied the starting point. Other people’s behaviour has to supply the evidence.</blockquote>
 <a class="button primary" href="${esc(p.link)}" target="_blank" rel="noopener noreferrer">Try Consto <span aria-hidden="true">↗</span></a>`);
 return '';
}
