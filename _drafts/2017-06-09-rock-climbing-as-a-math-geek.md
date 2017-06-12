---
layout: post
title: Rock climbing as a Math geek
---

I've been rock climbing for four years now and I'm a math geek. I've tried to analyse what it's that I like in rock climbing and the best way I've found to describe it is my modelling it as a mathematical equation (or inequality to be more correct). I see rock climbing as a way to find an **empirical solution to a mathematical inequality**. Here I'll try to elaborate on the idea.


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

Core
---







Do you do core excercises so that you could nail those overhangs with no sweat? Have you listened to the advice of pro's to stay as close to the wall as you can while crawling along the underside of the roof? Do you use flagging to position your body in a way that allows you to rest in a position even when there's no good hold to put your foot on. In all these cases you are using the tension in the muscles of your body to provide you with extra force. On steep overhangs this force from your core plays a very important role. When the wall is vertical and you have footholds, you can balance a lot of your weight on them (note: weight is the pull of gravity). But when you are in an overhang, even good footholds are of no use, because the angle your feet are making to the foothold is not helping. Your feet are making much larger angle with the vertical (close to 90deg), thus making the cos terms almost zero. It's only your arms that can help you in this situation and if the holds are crimpy then it's only your fingers that you are hanging from. This is the time you need to generate that extra force. You generate that by holding your body closer to the wall. In doing that you make the muscles in your core to carry some of your weight. This technique is of great importance to avoid finger injuries. By using your core to balance your weight, you are giving some breathing room to your fingers. We now introduce this term in our equation with the letter `d`.

But's it's not just the `b`s and `c`s that we use in practice when climbing. Remember that jug you were hanging from for dear life? Or when you wedged your body inside a chimney, so that you looked like an animal suspended in a fossil? Or when you were trying to climb with your hiking shoes instead of the rubber soled climbing shoes? Or when you have almost made the move except for a small imbalance, which you are trying to remove by trying to brush the skin of whichever body part you can brush against the wall - cheek, forehead, shoulder, beard, tongue(!)? Or when you keep dipping your fingers in that chalk bag? In all these scenarios, you are using the force of friction in addition to the usual forces of arms and legs. We will represent this new force with the letter `e` in our equation above. And as we have seen there are several different forces of friction that we employ during a climb, we will identify them with a subscript.

```
a = bleft*cos(phi1) + bright*cos(phi2) + cleft*cos(theta1) + cright*cos(theta2) + d + ei
```
