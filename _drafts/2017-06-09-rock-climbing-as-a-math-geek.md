---
layout: post
title: Rock climbing as a Math geek
---

I've been rock climbing for four years now and I'm a math geek. I've tried to analyse what it's that I like in rock climbing and the best way I've found to describe it is my modelling it as a mathematical equation (or inequality to be more correct). I see rock climbing as a way to find an **empirical solution to a mathematical inequality**. Here I'll try to elaborate on the idea. Once we have modelled the climbing activity as a mathematical equation we can use it to understand many aspects of climbing - e.g. risk of free solo, injury management, improving techniques to climb better, etc.


Boring
---

Let's start with a simple equation.

$$ a=b $$

Here, $$a$$ stands for the gravitational pull that's exerted on a standing person. $$b$$ is roughly the force that the muscles of legs provide in standing position in order to balance the force of gravity. So the end result is person remains standing.

<div style="text-align:center"><img src="/img/posts/climbing-math-standing.svg"/></div>

So far... *BORING*!

Arms and feet
---

When we start walking on a flat surface we change the force exerted by our leg muscles, so that we push ourselves forward and simultaneously balance the changing force of gravity as we move. So far only the leg muscles are involved. When we start climbing a tree or a rock, we are not only using our leg muscles, but our arms too. So if you are hanging from a ledge while stepping on a tentative foothold the equation looks like

$$ a=b+c $$

Here, $$c$$ stands for all the forces your arms are providing which get added to the forces that your leg muscles are providing, so that both of them together balance out the pull of gravity.

<div style="text-align:center"><img src="/img/posts/climbing-math-climbing-simple.svg"/></div>

Joints
---

In practice, our arms are not just straight sticks. An arm is broken into several limbs that hang together end on by means of joints - *elbows*,*wrists*,*knucles*. Ditto with legs - *knees*,*ankles*. So we can imagine the $$b$$ and $$c$$ terms broken into several $$b_i$$ and $$c_j$$ terms. The legs have $$m$$ limbs (thighs, ankles, calves, etc.) and hands have $$n$$ limbs (wrists, triceps, fingers, palms, etc.) All of them share the total weight of our body, thus equaling to $$a$$

$$ a = \sum_{i=1}^m b_i + \sum_{j=1}^n c_j $$

Now a geometry geek can't just stop here, when trignometry is winking at you just around the corner. The forces that you feel in your arms are felt along their length, but how much of the force is used to balance the force of gravity depends on the angle your arm is making to the vertical direction. A real interesting climb is when all your arms and legs are spread in this and that direction so that the amount of force our muscles can offer and the angles these forces make to the vertical fit just so perfectly to cancel out gravity's pull.

The equation therefore becomes

$$ a = \sum_{i=1}^m b_i cos\phi_i + \sum_{j=1}^n c_j cos\theta_j $$

The $$\theta$$s and $$\phi$$s are just the angles that our limbs make to the vertical. (I've avoided adding $$sin$$ terms, because any $$sin$$ term can be converted to $$cos$$ term with a simple $$sin\theta=cos(90^{\circ}-\theta)$$ transformation)

<div style="text-align:center"><img src="/img/posts/climbing-math-limbs.svg"/></div>

As you are scaling a rock, with pulling with one arm, pushing on one leg, balancing on left toe; you are changing values of theses $$b_i$$s and $$c_i$$s and the angles that make with the vertical so that their sum total balances out the pull of gravity.

Friction
---

It's not just the $$b_i$$s and $$c_j$$s that we use in practice when climbing. Remember that jug you were hanging from for dear life? Or when you wedged your body inside a chimney, so that you looked like an extinct animal suspended in a fossil? Or when you were trying to climb with your hiking shoes instead of the rubber soled climbing shoes? Or when you have almost made the move except for a small imbalance, which you are trying to regain by trying to brush the skin of whichever body part you can brush against the wall - cheek, forehead, shoulder, beard, tongue(!)? Or when you keep dipping your fingers in that chalk bag?

It's the Friction! In all these scenarios, you are using the force of friction in addition to the usual forces of arms and legs. We will represent this new force with the letter $$d$$ in our equation above. And as we have seen there are several different forces of friction that we employ during a climb, we will identify them with a subscript $$k$$.

$$ a = \sum_{i=1}^m b_i cos\phi_i + \sum_{j=1}^n c_j cos\theta_j + \sum_{k=1}^n d_k$$

<div style="text-align:center"><img src="/img/posts/climbing-math-friction.svg"/></div>

Core and more
---

It seems obvious how our feet give us support against gravity, while our arms help us hang from the wall to prevent falling. But it's not so obvious how our stomach can help us push against the gravity.

* Why is it helpful to build the core muscles in order to nail those steep overhangs?
* Why do the pro's advise to stay as close to the wall as you can while crawling along the underside of the roof?
* Do you use flagging to position your body in a way that allows you to rest in a position even when there's no good hold to put your foot on.

In all these cases you are using the tension in the muscles of your body to provide you with extra force. On steep overhangs this force from your core plays a very important role. When the wall is vertical and you have footholds, you can balance a lot of your weight on them. But when you are in an overhang, even good footholds are of no use, because the angle your feet are making to the foothold is not helping. Your feet are making much larger angle with the vertical (close to $$90^{\circ}$$), thus making the $$cos$$ terms almost zero. It's only your arms that can help you in this situation and if the holds are crimpy then it's only your fingers that you are hanging from. This is when you need to find force from other parts of your body. You generate that by holding your body closer to the wall. In doing that you make the muscles in your core carry some of your weight. This technique is of great importance to avoid finger injuries. By using your core to balance your weight, you are giving some breathing room to your fingers.

<div style="text-align:center"><img src="/img/posts/climbing-math-core.svg"/></div>

This force is difficult to picture, but easier to feel. By looking at the net effect of it, we are going to represent it with a single term $$E$$ in our equation. This will point upwards (oppsite the direction of gravity).

$$ a = \sum_{i=1}^m b_i cos\phi_i + \sum_{j=1}^n c_j cos\theta_j + \sum_{k=1}^n d_k + E $$


Locus
---

When we are climbing a route, our goal is to balance this equation for the entire duration of the climb. It's inevitable for the terms in equation to vary as we move from one position to another. A quality climb is characterized by how smoothly can we carry out these changes. For small durations the forces on right side of this equation suddenly fall short to balance the left side. But soon our body tries to adapt. It repositions itself so the limbs could get into a position to eventually find the necessary force. If it fails to do that the equation becomse out of balance and the result is a fall.

With this view in mind, a clean climb of the route can be seen as traversing the solution of this equation.

If a difficult climb forces you to take multiple falls, then you are traversing the solution of this equation in discontinuous spans.



How to use this?
===

Better technique
---
* Flagging
* Close to the wall

Finger injuries
---
* Taping

Risk of Free Solo
---
Unknown variables

Estimating risks in trad/sport climbing
---
TBD


