---
title: "Where the Jacobian Counterexample Comes From"
date: 2026-07-22
---

Two days ago the Jacobian conjecture, open since 1939, was shown to be false. The counterexample is a completely explicit map $\C^3\to\C^3$ written out in three polynomials, and verifying that it works is a matter of grinding through some partial derivatives.

The interesting part is that this counterexample was obtained by an LLM — Claude — and that it also was not obtained by brute-force search but rather by a clever geometric construction. This post is about that geometry.

Unlike my last post, I am assuming only calculus and linear algebra. Everything else is built up from nothing.

## What is the Jacobian conjecture

A *polynomial map*

$$
F:\C^n\longrightarrow\C^n
$$

is a map whose output coordinates are polynomials in the input coordinates:

$$
F(x_1,\ldots,x_n)=\bigl(F_1(x_1,\ldots,x_n),\ldots,F_n(x_1,\ldots,x_n)\bigr).
$$

For instance

$$
(x,y)\longmapsto (x+y^2,\;y)
$$

is a polynomial map, while

$$
(x,y)\longmapsto(e^x,e^y)
$$

is not.

Its derivative at a point is the Jacobian matrix of partial derivatives,

$$
DF=
\begin{pmatrix}
\dfrac{\partial F_1}{\partial x_1} & \cdots & \dfrac{\partial F_1}{\partial x_n}\\
\vdots & \ddots & \vdots\\
\dfrac{\partial F_n}{\partial x_1} & \cdots & \dfrac{\partial F_n}{\partial x_n}
\end{pmatrix},
$$

and its determinant $\det DF$ is again a polynomial in $x_1,\ldots,x_n$.

For the example above,

$$
DF=\begin{pmatrix}1&2y\\0&1\end{pmatrix},
\qquad
\det DF=1,
$$

and indeed this map has a polynomial inverse, namely $(x,y)\mapsto(x-y^2,y)$.

Compare with $(x,y)\mapsto(x^2,y)$, where $\det DF=2x$. This determinant is not constant, and the map is genuinely bad: it is two-to-one away from $x=0$ and crushes the line $x=0$.

> **Jacobian conjecture.** If $F:\C^n\to\C^n$ is a polynomial map and $\det DF$ is a nonzero constant, then $F$ has a polynomial inverse.

One direction is easy and true. Suppose $F$ already has a polynomial inverse $G$. Differentiating $G\circ F=\mathrm{id}$ with the chain rule gives

$$
DG_{F(x)}\,DF_x=I,
$$

so taking determinants,

$$
\det DG_{F(x)}\cdot\det DF_x=1.
$$

Both factors are polynomial functions of $x$. Two polynomials can multiply to the constant $1$ only if both are nonzero constants. So constancy of the Jacobian determinant is a necessary condition. The conjecture asked whether it was sufficient. But why should we believe sufficiency?

The hypothesis $\det DF_x\neq0$ is exactly the hypothesis of the inverse function theorem. It tells you that near each point $x$ there are small neighbourhoods $U\ni x$ and $V\ni F(x)$ such that

$$
F|_U:U\longrightarrow V
$$

is a bijection with a nice inverse. In other words, $F$ is invertible near every single point.

So the question is whether these local inverses can be glued into one global, polynomial inverse. Polynomials are rigid, $\C^n$ has no holes in it, and there seemed to be little room for the local pieces to not glue. The only issue is that actually proving this resisted all attempts since 1939 (which we now know is because the conjecture is false).

To get a better handle on local vs global invertibility, here is the smallest example showing that local invertibility really is weaker than global invertibility. Take

$$
f:\C\setminus\{0\}\longrightarrow\C\setminus\{0\},
\qquad
f(z)=z^2.
$$

Its derivative $2z$ never vanishes, so $f$ is invertible near every point. But globally it is two-to-one, since $z$ and $-z$ have the same square. Nothing is contradictory here: if you start at $z=1$, choose the local inverse sending $1$ to $1$, and continue it once around the puncture at the origin, you come back holding the branch that sends $1$ to $-1$. The two sheets communicate around the hole.

The conjecture was, in effect, the conjecture that on $\C^n$, which has no hole to walk around, this cannot happen. The counterexample says this isn't true, and the reason is that a polynomial map on $\C^n$ has another way of misbehaving: points can escape to infinity. I will come back to this intuition at the end, once we have something concrete to point at.

## The counterexample

Define $F=(P,Q,R):\C^3\to\C^3$ by

$$
\begin{aligned}
P(x,y,z)&=(1+xy)^3z+y^2(1+xy)(4+3xy),\\
Q(x,y,z)&=y+3x(1+xy)^2z+3xy^2(4+3xy),\\
R(x,y,z)&=2x-3x^2y-x^3z.
\end{aligned}
$$

A straightforward computation gives the following:

1. $\det DF=-2$ at every point of $\C^3$.
2. $F$ sends multiple different points to the same point (in jargon: it is not *injective*). Explicitly,

$$
F\left(0,0,-\tfrac14\right)
=F\left(1,-\tfrac32,\tfrac{13}{2}\right)
=F\left(-1,\tfrac32,\tfrac{13}{2}\right)
=\left(-\tfrac14,0,0\right).
$$

A map that is not injective certainly has no inverse of any kind, for this inverse would have to map one point to multiple different points, so the conjecture is dead.

What I actually want to explain is why on earth anyone would write down these three polynomials and find where injectivity fails. In particular, why does a map with a constant Jacobian determinant hit the same point *three* times, and what is the number three doing there?

> **Remark.** The same example works in every dimension $n\geq3$: just carry the extra coordinates along unchanged, $(x,y,z,u_4,\ldots,u_n)\longmapsto(F(x,y,z),u_4,\ldots,u_n)$. The two-dimensional case is still open.

## Projective space

Everything from here on happens in projective space, so that is what we build first before we even introduce the idea behind the construction. Let's start with $\C$. Take the points $1,2,3,4,\ldots$. They march off and never settle down, not because they are badly behaved but because there is no point of $\C$ available for them to settle down at. The same goes for $i,2i,3i,\ldots$, or for any sequence that runs away.

Projective space is the fix. Bolt on new points, one for each direction in which you can run away, so that running away becomes a way of converging to something.

### How many directions does $\C$ have?

If we were doing this to the real line, the answer would be two. You can leave to the left or to the right, and those are genuinely different fates, so you would add $+\infty$ and $-\infty$.

Over $\C$ the answer is one. A direction, for our purposes, is a complex line through the origin, and $\C$ is a single such line. Multiplying by a nonzero complex number can rotate as well as stretch, so leaving along the positive reals and leaving along the positive imaginaries point in the same complex direction. You can see this without any algebra: once you are far from the origin you can travel from one escape route to any other by walking around a huge circle, never coming back. So the two ends of the real line get glued into one.

That gives us

$$
\Pj^1=\C\cup\{\text{one point at infinity}\}.
$$

### The definition

To turn "ordinary points together with directions" into one uniform object, the trick is to go up a dimension and let a single construction produce both at once.

$$
\Pj^n:=\{\text{lines through the origin in }\C^{n+1}\}.
$$

A nonzero vector $(X_0,\ldots,X_n)$ spans such a line, and scaling it does not change the line, so we write the corresponding point as

$$
[X_0:\cdots:X_n],
\qquad
[X_0:\cdots:X_n]=[\lambda X_0:\cdots:\lambda X_n]\ \ (\lambda\neq0).
$$

For example, in $\Pj^1$,

$$
[1:2]=[2:4]=[-3:-6],
$$

all naming the same point. These are called homogeneous coordinates.

Now, sort the points of $\Pj^n$ by whether the last coordinate vanishes.

If $X_n\neq0$, we can scale so that $X_n=1$, and there is exactly one way to do it. What is left is

$$
\left(\frac{X_0}{X_n},\ldots,\frac{X_{n-1}}{X_n}\right)\in\C^n,
$$

with no constraints. These are the ordinary points, and they form a faithful copy of $\C^n$.

If $X_n=0$, we are looking at $[X_0:\cdots:X_{n-1}:0]$ with the remaining coordinates not all zero and still taken up to scaling. That is precisely a copy of $\Pj^{n-1}$, and it records one point for each direction in $\C^n$, as by definition $\Pj^{n-1}$ is the space of lines in $\C^n$. So

$$
\Pj^n=\C^n\ \cup\ \Pj^{n-1},
\qquad
\text{ordinary points}\ \cup\ \text{directions of escape}.
$$

And the runaway sequence really does converge now. In $\Pj^1$ the ordinary point $x$ is $[x:1]$, and for $x\neq0$

$$
[x:1]=\left[1:\tfrac1x\right].
$$

As $x\to\infty$ the right hand side tends to $[1:0]$, which is the one point we added. Nothing escapes any more.

### The three cases we need

- $\Pj^1=\C\cup\{[1:0]\}$, with coordinates $[s:t]$. Every point with $t\neq0$ is $[x:1]$ for a unique $x\in\C$, and $[1:0]$ is the point at infinity. There is also a nice concrete picture: a line through the origin in $\C^2$ is determined by its slope $t/s$, except for the vertical line $s=0$. So $\Pj^1$ is the set of all slopes plus one extra element for "vertical".
- $\Pj^2=\C^2\cup\Pj^1$, with coordinates $[a:b:c]$. Here the points at infinity form an entire projective line, one for each direction in the plane. This is the setting for the thought that parallel lines meet at infinity: two parallel lines in $\C^2$ run off in the same direction, so they now genuinely share a point.
- $\Pj^3=\C^3\cup\Pj^2$, with coordinates $[Z_0:Z_1:Z_2:Z_3]$.

Two things to carry forward.

First, there is nothing special about the last coordinate. The set where any one coordinate vanishes is called a hyperplane, and the argument above says that deleting a hyperplane from $\Pj^n$ leaves a copy of $\C^n$ behind. That single fact is the mechanism by which this whole construction eventually spits out an honest polynomial map $\C^3\to\C^3$, and choosing *which* hyperplane to delete turns out to be the hardest decision in the entire construction.

Second, an individual coordinate $X_i$ is not a number attached to a point of $\Pj^n$, because rescaling changes it. Only statements that survive rescaling are meaningful: ratios such as $X_0/X_1$, and vanishing conditions such as $X_2=0$. This will matter the moment we start feeding polynomials into these coordinates.

### The correspondence between $\Sym^n(\Pj^1)$ and $\Pj^n$

Let $\Sym^n(\Pj^1)$ be the space of an unordered collection of $n$ points. So, for example, for points $p, q, r \in \Pj^1$, $\{p, q, r\} \in \Sym^3(\Pj^1)$ and is the same point as $\{q, p, r\}$. $\{p, p, q\}$ is also another example of a point in $\Sym^3(\Pj^1)$. Now, remember a point $p = [s:t]$ in $\Pj^1$ is really a line in $\C^2$, and we can describe the line of $[s:t]$ as the points $(X, Y) \in \C^2$ where $tX - sY$ vanishes (remember, $t$ and $s$ aren't well defined, but they are well defined up to some scaling $t \mapsto \lambda t$ and $s \mapsto \lambda s$ which doesn't change the points where $tX - sY$ vanishes). Taking $n$ such points $p_i = [s_i : t_i]$, we can consider this linear polynomial $t_i X - s_iY$ for each $i$, and take the product to get a polynomial in two variables $X, Y$ such that it is homogeneous — every monomial in the sum has the same degree — and moreover this degree equals the number of points, $n$. The $n+1$ coefficients of the resulting polynomial are only well defined up to scaling, because of the scaling ambiguity for the linear factors, so we have a map to $\Pj^n$. Changing the order of the points doesn't change the final polynomial, and given any homogeneous polynomial of two variables, the fundamental theorem of algebra guarantees it factors into a product of linear polynomials, from which we can recover the unordered collection of $p_i$. This tells us that $\Sym^n(\Pj^1)$ naturally corresponds to $\Pj^n$.

### The usefulness of the extra point

Consider the family of quadratics

$$
q_a(T)=aT^2+3T+2.
$$

For $a\neq0$ there are two roots. At $a=0$ the polynomial degenerates to $3T+2$ and one root has vanished. Where did it go? As $a\to0$ the two roots are

$$
T=\frac{-3\pm\sqrt{9-8a}}{2a},
$$

and one of them stays near $-2/3$ while the other runs off to infinity.

In $\Pj^1$ nothing is lost. Homogenise the polynomial by writing $T=U/V$ and clearing denominators:

$$
aU^2+3UV+2V^2.
$$

At $a=0$ this is $V(3U+2V)$, whose roots are $[1:0]$ and $[-2:3]$. Still two roots. The missing one simply moved to the point at infinity.

This is a useful fact about $\Pj^1$: a degree-$n$ homogeneous polynomial in two variables has exactly $n$ roots in $\Pj^1$ counted with multiplicity, always, with no exceptions for degenerate cases.

### Homogeneous polynomials

Asking whether a polynomial "vanishes at $[s:t]$" only makes sense if the answer does not depend on which representative $(s,t)$ we picked.

Take $g(U,V)=U^2+V^2$. Then $g(\lambda s,\lambda t)=\lambda^2 g(s,t)$, so $g$ vanishes at one representative exactly when it vanishes at all of them. The statement "$[1:i]$ is a root of $g$" is meaningful.

Now take $h(U,V)=U^2+V$. We have $h(1,-1)=0$ but $h(2,-2)=2$. So "$[1:-1]$ is a root of $h$" is not a meaningful statement.

The difference is that $g$ is homogeneous, meaning every monomial has the same total degree. From now on all polynomials on $\Pj^1$ are homogeneous ones.

The basic example is the linear form attached to a point. For $p=[s:t]$, set

$$
\ell_p(U,V)=tU-sV.
$$

It is homogeneous of degree $1$, and $\ell_p(s,t)=ts-st=0$, so its unique root is $p$.

### $\Sym^n(\Pj^1) \cong \Pj^n$

Here is the identification that makes the whole construction possible.

A binary form (homogeneous polynomial of two variables) of degree $n$,

$$
Z_0U^n+Z_1U^{n-1}V+\cdots+Z_nV^n,
$$

has $n+1$ coefficients. By the fundamental theorem of algebra (applied after dehomogenising) it factors completely into linear forms,

$$
c\,\ell_{p_1}\ell_{p_2}\cdots\ell_{p_n},
$$

so it determines an unordered list of $n$ points of $\Pj^1$, repetitions allowed. Conversely the list determines the form up to an overall scalar, since scaling all coefficients by $\mu\neq0$ changes nothing about the roots.

So: unordered $n$-tuples of points of $\Pj^1$ correspond exactly to coefficient vectors $[Z_0:\cdots:Z_n]$ taken up to scaling. That set of scaled coefficient vectors is by definition the projective space $\Pj^n$, defined just like $\Pj^1$ but with lines through the origin in $\C^{n+1}$.

Write $\Sym^n(\Pj^1)$ for the space of unordered $n$-tuples. The symbol $\Sym$ means order has been forgotten, so $(p,q)$ and $(q,p)$ are the same object. We have shown

$$
\boxed{\Sym^n(\Pj^1)\cong\Pj^n.}
$$

Some examples for $n=2$, where a point of $\Pj^2$ is $[a:b:c]$ standing for $aU^2+bUV+cV^2$:

- $[1:0:-1]$ is $U^2-V^2=(U-V)(U+V)$, the pair $\{[1:1],[-1:1]\}$.
- $[1:-2:1]$ is $(U-V)^2$, the pair $\{[1:1],[1:1]\}$, a doubled point.
- $[0:1:0]$ is $UV$, the pair $\{[1:0],[0:1]\}$, one of whose members is the point at infinity.

## The basic idea

We have an obvious map taking in a point in $\Pj^1$ and an unordered collection of two points in $\Pj^1$ (which is just a point in $\Sym^2(\Pj^1) \cong \Pj^2$) to an unordered collection of three points (which is a point in $\Sym^3(\Pj^1) \cong \Pj^3$). In terms of $\Sym$, this map is given by $(p, \{q, r\}) \mapsto \{p, q, r\}$, so generally it will be three-to-one: $(p, \{q, r\})$, $(q, \{p, r\})$, $(r, \{p, q\})$ all map to the same point. Most everything else in this post is bookkeeping (which is also the hard part) in service of two goals:

1. make the derivative of this map invertible everywhere; this will turn out to require deleting the points where the marked root collides with one of the unmarked ones;
2. arrange that after the deletions, both the source and the target are literally $\C^3$, so that the map becomes a polynomial map $\C^3\to\C^3$ and the conjecture applies to it.

## The root-forgetting map

Define

$$
\pi:\Pj^1\times\Sym^2(\Pj^1)\longrightarrow\Sym^3(\Pj^1),
\qquad
\pi\bigl(p,\{q,r\}\bigr)=\{p,q,r\}.
$$

The source records a triple together with a choice of one distinguished member. The target records only the triple.

Note the dimensions: $\Pj^1\times\Pj^2$ is $1+2=3$ dimensional and $\Pj^3$ is $3$ dimensional, so a finite-to-one map is at least plausible.

In coordinates $\pi$ is multiplication of a linear form by a quadratic form. With $p=[s:t]$ and $Q=aU^2+bUV+cV^2$,

$$
\begin{aligned}
(tU-sV)(aU^2+bUV+cV^2)={}&taU^3+(tb-sa)U^2V\\
&+(tc-sb)UV^2-scV^3,
\end{aligned}
$$

so

$$
\boxed{\pi([s:t],[a:b:c])=[\,ta\;:\;tb-sa\;:\;tc-sb\;:\;-sc\,].}
$$

Each coordinate is a polynomial, linear in $(s,t)$ and linear in $(a,b,c)$, which is exactly what a well-defined map of projective spaces needs. Clearly, this map will generally be three-to-one.

## Interlude: differentiating a map between projective spaces

We are about to differentiate $\pi$, and there is a problem with that sentence. A partial derivative is a limit of difference quotients of coordinates, so before you can differentiate anything you need coordinates. But $\pi$ goes from $\Pj^1\times\Sym^2(\Pj^1)$ to $\Sym^3(\Pj^1)$, and none of these is $\C^n$. As we saw, a homogeneous coordinate like $Z_2$ is not even a well defined number at a point.

The fix is standard and worth understanding properly, because the entire argument later hinges on it: we will compute the derivative of $\pi$ in whichever coordinates are most convenient, and then use the answer, many pages later, in a completely different set of coordinates. So we had better know what survives a change of coordinates and what does not.

### Charts

A *chart* is an identification of some piece of our space with a piece of $\C^n$, so that calculus makes sense there. No single chart has to cover everything. What matters is that every point lies in some chart, and that on the overlap of two charts there is a rule translating one set of coordinates into the other.

The everyday version of this is a road atlas. The Earth is not flat, so no single flat page shows all of it faithfully. But every town appears on some page, each page is an honest picture of the region it covers, and where two pages overlap you can say precisely how to convert a position on one page into a position on the other. Nobody thinks the atlas makes the Earth ambiguous.

Here is the whole thing for $\Pj^1$, explicitly.

- **Chart 1.** Throw away the point $[1:0]$. Every remaining point is $[T:1]$ for exactly one $T\in\C$. Coordinate: $T$.
- **Chart 2.** Throw away the point $[0:1]$. Every remaining point is $[1:T']$ for exactly one $T'\in\C$. Coordinate: $T'$.

Neither chart covers $\Pj^1$, but together they do, since no point has both coordinates zero. On the overlap, where $s$ and $t$ are both nonzero,

$$
[T:1]=\left[1:\tfrac1T\right],
\qquad\text{so}\qquad
T'=\frac1T .
$$

That is the translation rule, and it is a perfectly ordinary function on the overlap.

We will constantly want to say "call this point infinity". That just means choosing a chart. To send the point $[\alpha:1]$ to infinity, use the coordinate

$$
T''=\frac{1}{T-\alpha},
$$

which is finite exactly when $T\neq\alpha$. In general, an invertible linear substitution

$$
(U,V)\longmapsto(aU+bV,\,cU+dV),
\qquad ad-bc\neq0,
$$

carries $\Pj^1$ to itself and, in the coordinate $T=U/V$, reads

$$
T\longmapsto\frac{aT+b}{cT+d}.
$$

Charts on $\Sym^n(\Pj^1)$ come along for free. Pick a coordinate $T$ on $\Pj^1$ and restrict attention to the $n$-tuples with no root at infinity. Such an $n$-tuple $\{\lambda_1,\ldots,\lambda_n\}$ is recorded faithfully by the coefficients of

$$
(T-\lambda_1)\cdots(T-\lambda_n)=T^n-e_1T^{n-1}+\cdots+(-1)^ne_n,
$$

so $(e_1,\ldots,e_n)\in\C^n$ is a chart. (In homogeneous terms this is the region $Z_0\neq0$, and the $e_i$ are the ratios $Z_i/Z_0$ up to sign, so it is one of the charts from the projective space section.) Charts on a product such as $\Pj^1\times\Sym^2(\Pj^1)$ are just charts on each factor side by side, giving $1+2=3$ coordinates.

### What survives a change of chart

Write $F$ for our map. Described in one pair of charts it is some map $F_1$ between open pieces of $\C^3$; described in another it is some other map $F_2$. These are related by

$$
F_2=\beta\circ F_1\circ\alpha^{-1},
$$

where $\alpha$ is the translation rule between the two source charts and $\beta$ the one between the two target charts. So the matrix $DF_1$ and the matrix $DF_2$ are genuinely different objects, and we should not expect $\det DF_1=\det DF_2$.

The good news is contained in a fact we have already used once.

> **Lemma.** If $f$ is differentiable near a point $p$ and has a differentiable inverse $g$ near $f(p)$, then $Df_p$ is an invertible matrix. In particular $\det Df_p\neq0$.

The proof is one line, and it is exactly the argument from the very first section. Differentiate $g(f(x))=x$ at $x=p$ with the chain rule:

$$
Dg_{f(p)}\,Df_p=I .
$$

A square matrix with a left inverse is invertible, so $\det Df_p\neq0$.

Now apply the chain rule to $F_2=\beta\circ F_1\circ\alpha^{-1}$:

$$
DF_2=D\beta\cdot DF_1\cdot D(\alpha^{-1}),
$$

and take determinants:

$$
\det DF_2=\underbrace{\det D\beta}_{\neq0}\cdot\det DF_1\cdot\underbrace{\det D(\alpha^{-1})}_{\neq0}.
$$

Both outer factors are nonzero by the Lemma, since $\alpha$ and $\beta$ are translation rules between charts and every such rule is invertible with a differentiable inverse (namely the rule going the other way). Therefore

$$
\boxed{\det DF_2=0
\quad\Longleftrightarrow\quad
\det DF_1=0 .}
$$

The *number* $\det DF$ depends on which charts you happened to pick. Whether that number is zero does not. So the statement "the derivative of $\pi$ degenerates at this point" is a fact about the point, not about our bookkeeping, and we are free to compute it in the easiest chart available.

## The ramification locus

Fix any point $(p,\{q,r\})$ of the source. We basically saw that whether the "derivative" of this map vanishes at a point is now well defined, even though we are working with sources and targets that aren't $\C^3$. Choose a point of $\Pj^1$ that is not one of $p,q,r$ and call it infinity. This is always possible, since we only have to dodge at most three points and $\Pj^1$ has infinitely many. In the resulting chart, $p,q,r$ are all ordinary complex numbers, and the same chart works for the target, because the triple $\{p,q,r\}$ has no root at the chosen infinity either.

Write $p=x$ for the marked root. For the unordered pair $\{q,r\}$ we need coordinates that do not remember the order, and the right ones are the coefficients of the monic quadratic:

$$
Q(T)=(T-q)(T-r)=T^2-uT+v,
\qquad
u=q+r,\quad v=qr.
$$

The pair $\{2,3\}$ has $(u,v)=(5,6)$, and so does the pair $\{3,2\}$, as it must. Individually $q$ and $r$ are not functions on the space of unordered pairs, whereas $u$ and $v$ are. So $(x,u,v)$ is a chart on the source.

On the target use the matching chart, the elementary symmetric functions of the three roots, meaning the coefficients of

$$
T^3-e_1T^2+e_2T-e_3.
$$

Multiplying out,

$$
(T-x)(T^2-uT+v)=T^3-(x+u)T^2+(v+xu)T-xv,
$$

so in these coordinates $\pi$ becomes the honest polynomial map

$$
\Phi(x,u,v)=\bigl(\underbrace{x+u}_{e_1},\;\underbrace{v+xu}_{e_2},\;\underbrace{xv}_{e_3}\bigr),
$$

which we can differentiate like anything else:

$$
D\Phi=
\begin{pmatrix}
1&1&0\\
u&x&1\\
v&0&x
\end{pmatrix}.
$$

Expanding along the top row,

$$
\det D\Phi=1\cdot(x^2-0)-1\cdot(ux-v)=x^2-ux+v=Q(x)=(x-q)(x-r).
$$

By the previous section this vanishes or not independently of the chart we chose, and the answer it gives is manifestly a statement about the points themselves. So

$$
\boxed{
\text{the derivative of }\pi\text{ degenerates at }(p,\{q,r\})
\iff
p=q\ \text{ or }\ p=r.
}
$$

Two things are worth noticing about this. First, the answer came out as $Q(x)$, the quadratic evaluated at the marked root, which is a quantity with no reference to the chart in it. Second, every point of the source is covered by a chart of the kind we used, so the statement really is proved everywhere, not just on some convenient piece.

The degeneration happens precisely where the marked root collides with one of the other two, which is the collision we predicted on general grounds: at such a point two of the three ways to mark a root become the same way, and the three sheets of the map crash together. Call this locus

$$
R=\bigl\{(p,\{q,r\}):p\in\{q,r\}\bigr\},
$$

the *ramification locus*.

We can also write $R$ down with no chart at all. Saying $p\in\{q,r\}$ is saying that $p$ is a root of $Q$, and in homogeneous coordinates that is

$$
\rho:=Q(s,t)=as^2+bst+ct^2=0.
$$

Note that this is a legitimate condition on a point of $\Pj^1\times\Pj^2$, in the sense discussed earlier: rescaling $(s,t)$ by $\lambda$ and $(a,b,c)$ by $\mu$ multiplies $\rho$ by $\lambda^2\mu$, so whether $\rho$ vanishes is well defined even though its value is not.

Delete it. On

$$
\Pj^1\times\Pj^2\setminus R=\{\rho\neq0\}
$$

the derivative of $\pi$ is invertible at every point, while the map is still three-to-one over cubics with three distinct roots.

Sanity check with the earlier example: $p=[0:1]$ and $Q=U^2-4V^2$ give $\rho=1\cdot0^2+0\cdot0\cdot1+(-4)\cdot1^2=-4\neq0$, so that point survives, as it should, since $0\notin\{2,-2\}$.

## Making the target an affine space

So far everything lives in projective spaces, but the Jacobian conjecture is a statement about polynomial maps $\C^3\to\C^3$. We have to cut both sides down to copies of $\C^3$.

The target is easy in principle. This is the fact flagged earlier: deleting a hyperplane from $\Pj^n$ always leaves $\C^n$ behind. Deleting $\{Z_2=0\}$ from $\Pj^3$ leaves the points with $Z_2\neq0$, each of which scales uniquely so that $Z_2=1$, and then

$$
\left(\frac{Z_0}{Z_2},\frac{Z_1}{Z_2},\frac{Z_3}{Z_2}\right)\in\C^3
$$

is free to be anything.

So take

$$
H=\{Z_2=0\},
\qquad
Y=\Pj^3\setminus H\cong\C^3.
$$

Since $Z_2=e_2$ for a monic cubic, $H$ has a clean description: it is the set of root-triples $\{\lambda_1,\lambda_2,\lambda_3\}$ with

$$
\lambda_1\lambda_2+\lambda_1\lambda_3+\lambda_2\lambda_3=0.
$$

Now pull back. From the formula for $\pi$, the coordinate $Z_2$ becomes

$$
h:=tc-sb,
$$

so $\pi^{-1}(H)=\{h=0\}$. In the affine coordinates of the previous section, $h$ is just $e_2=xu+v$, which is a different condition from $\rho=x^2-ux+v$. These are two genuinely different hypersurfaces and we are going to remove both.

The question that decides everything is: which hyperplane $H$ should we take? As you may have guessed, it is exactly this $Z_2 = 0$ hyperplane, but why?

## Choosing the hyperplane

Inside the target $\Sym^3(\Pj^1)=\Pj^3$ sits a curve: the triples whose three points all coincide. In a nice chart, the triple root at $\lambda$ has cubic

$$
(U-\lambda V)^3=U^3-3\lambda U^2V+3\lambda^2UV^2-\lambda^3V^3,
$$

so this curve is

$$
\delta(\lambda)=[1:-3\lambda:3\lambda^2:-\lambda^3].
$$

This is the classical *twisted cubic*. It is the locus of maximum degeneracy, the cubics that are as far as possible from having three distinct roots, and it is where the geometry of $\pi$ is worst. Note that the twisted cubic is in the image of the ramification locus, because the ramification is where the chosen point collides with one of the unordered points, and the twisted cubic is the image where all three points are the same.

A hyperplane in $\Pj^3$ meets this curve in three points counted with multiplicity: substituting $\delta(\lambda)$ into the linear equation of the hyperplane gives a cubic equation in $\lambda$. That gives a three-way classification:

- three distinct intersection points: the hyperplane is transverse;
- a double point and a simple point: the hyperplane is *tangent*;
- a triple point: the hyperplane is *osculating*, hugging the curve to second order.

Test the three coordinate choices by restricting the symmetric functions to the curve. Since $\delta(\lambda)$ is the triple $\{\lambda,\lambda,\lambda\}$,

$$
e_1=3\lambda,\qquad e_2=3\lambda^2,\qquad e_3=\lambda^3.
$$

Near $\lambda=0$ these vanish to orders $1$, $2$, and $3$. So $\{Z_1=0\}$ is transverse there, $\{Z_2=0\}$ is tangent, and $\{Z_3=0\}$ is osculating.

We want the middle one:

$$
H=\{Z_2=0\},
\qquad
Z_2\bigl(\delta(\lambda)\bigr)=3\lambda^2.
$$

The function vanishes at $\lambda=0$ together with its first derivative, but its second derivative is $6\neq0$. Tangent but not osculating.

I cannot yet say why this is the right choice, only that it is, and that the next two sections show what goes right and what goes wrong on either side of it. The basic idea is that tangency creates a controlled collision that produces exactly the divisibility we need, and non-osculation stops that collision from being so severe that the whole construction degenerates.

### The collision, seen fibre by fibre

There is a concrete way to see the tangency without mentioning the twisted cubic at all.

Project $\Pj^1\times\Pj^2\to\Pj^1$ onto the first factor. Above each point $p=[s:t]$ sits a copy of $\Pj^2$ with coordinates $[a:b:c]$, the space of quadratics. Inside that fibre, our two deleted sets are both *lines*, since both equations are linear in $(a,b,c)$:

$$
R_p:\ s^2a+stb+t^2c=0,
\qquad
H_p:\ -sb+tc=0.
$$

Their coefficient vectors are $(s^2,st,t^2)$ and $(0,-s,t)$. These are proportional exactly when $s=0$.

So for every $p$ except one, we delete two distinct lines from the fibre. At the single point

$$
p=[0:1]
$$

both equations become $c=0$ and the two lines fall on top of each other. That single collision is the whole content of the tangency of $H$ to the twisted cubic, and it is the source of everything delicate that follows.

## The source is an affine space too

Set

$$
X=\bigl(\Pj^1\times\Pj^2\bigr)\setminus\bigl(R\cup\pi^{-1}(H)\bigr)
=\{\rho\neq0\}\cap\{h\neq0\}.
$$

We want to show $X\cong\C^3$. This happens in two steps: first $X$ becomes a surface in $\C^5$ cut out by two equations, then that surface gets straightened out into $\C^3$.

### Step one: killing the scalings

A point of $\Pj^1\times\Pj^2$ is a pair of vectors

$$
(s,t;a,b,c)
$$

where we are allowed to rescale each half independently:

$$
(s,t)\mapsto(\lambda s,\lambda t),
\qquad
(a,b,c)\mapsto(\mu a,\mu b,\mu c),
\qquad
\lambda,\mu\neq0 .
$$

Ordinarily there is no canonical way to pick a representative. But we have two functions with different scaling weights:

$$
h=tc-sb\ \longmapsto\ \lambda\mu\,h,
\qquad
\rho=as^2+bst+ct^2\ \longmapsto\ \lambda^2\mu\,\rho,
$$

and on $X$ both are nonzero. So we can demand

$$
h=1
\qquad\text{and}\qquad
\rho=1
$$

and solve for the scalings. Dividing the two conditions gives $\lambda=h/\rho$, and then $\mu=\rho/h^2$. Both are determined, and uniquely so, since the only $(\lambda,\mu)$ fixing $h$ and $\rho$ is $(1,1)$.

This is the same maneuver as normalising a vector to unit length in order to name a point of a projective space, except that here there are two independent scalings and we happen to have two independent nonvanishing quantities to spend on them.

The normalised representative is

$$
\xi=\frac{sh}{\rho},
\qquad
\eta=\frac{th}{\rho},
\qquad
A=\frac{a\rho}{h^2},
\qquad
B=\frac{b\rho}{h^2},
\qquad
C=\frac{c\rho}{h^2}.
$$

These five quantities are unchanged by both rescalings, so they are genuine functions on $X$. And by construction they satisfy exactly the two normalisation conditions:

$$
\eta C-\xi B=\frac{tc-sb}{h}=1,
$$

$$
A\xi^2+B\xi\eta+C\eta^2=\frac{as^2+bst+ct^2}{\rho}=1.
$$

Let $W\subset\C^5$ be the set of $(\xi,\eta,A,B,C)$ satisfying

$$
\eta C-\xi B=1 \tag{1}
$$

$$
A\xi^2+B\xi\eta+C\eta^2=1 \tag{2}
$$

Then $X\cong W$. The inverse map is transparent: given a solution, read it as the pair of points $[\xi:\eta]$ and $[A:B:C]$. These are legitimate points, because $\xi=\eta=0$ would contradict (2) and $A=B=C=0$ would contradict (1). And the resulting point lies in $X$ because its $h$ and $\rho$ values are $1$ and $1$, not $0$.

So the source is now a concrete surface in $\C^5$: two equations, five unknowns, cutting out an object that therefore in some sense has dimension three.

### Step two: straightening $W$ out

Now the least geometric part. We produce three free coordinates on $W$ by a chain of divisibilities, each of which happens because something is forced to vanish when $\xi=0$.

Recall that $\xi=sh/\rho$, so $\xi=0$ means $s=0$, which means $p=[0:1]$: exactly the fibre where the two deleted lines collided. That is the tangency showing up in the algebra.

**First divisibility.** Put

$$
u=A\xi+2B\eta.
$$

Subtract $\eta$ times (1) from (2). On the left,

$$
\bigl(A\xi^2+B\xi\eta+C\eta^2\bigr)-\eta\bigl(\eta C-\xi B\bigr)
=A\xi^2+2B\xi\eta
=\xi u,
$$

and on the right, $1-\eta$. Hence

$$
1-\eta=\xi u,
\qquad\text{so}\qquad
\eta=1-\xi u.
$$

**Second divisibility.** Put

$$
v=B+uC.
$$

Substituting $\eta=1-\xi u$ into (1),

$$
(1-\xi u)C-\xi B=1
\quad\Longrightarrow\quad
C-1=\xi(B+uC)=\xi v,
$$

so

$$
C=1+\xi v.
$$

**Third divisibility.** This one is not forced by a single substitution but by the two equations together. Put

$$
w=A-4Bu-2u^2C.
$$

Then one checks, using the relations already derived, that

$$
3u-2v=\xi w.
$$

(If you want to see it: eliminate $B$ using $2B=u-A\xi+2B\xi u$, then use $1-C=-\xi v$. Everything collapses.) Equivalently

$$
v=\frac{3u-\xi w}{2}.
$$

Now run the substitutions backwards. Starting from three free numbers $(\xi,u,w)$:

$$
\begin{aligned}
\eta&=1-\xi u,\\
v&=\tfrac12\bigl(3u-\xi w\bigr),\\
C&=1+\xi v=1+\tfrac32\xi u-\tfrac12\xi^2w,\\
B&=v-uC=\tfrac12\bigl(u-\xi w-3\xi u^2+\xi^2uw\bigr),\\
A&=w+4Bu+2u^2C=w+4u^2-2\xi uw-3\xi u^3+\xi^2u^2w.
\end{aligned}
$$

Every one of these is a polynomial in $(\xi,u,w)$, with no denominators anywhere. And in the other direction, $\xi$ is one of the original coordinates while

$$
u=A\xi+2B\eta,
\qquad
w=A-4Bu-2u^2C
$$

are polynomials in the original coordinates. The two maps are mutually inverse. Therefore

$$
\boxed{X\cong W\cong\C^3,}
$$

with free coordinates $(\xi,u,w)$.

As a sanity check, look at the special fibre $\xi=0$. The formulas give $\eta=1$, $C=1$, $B=u/2$, $A=w+4u^2$. So the slice of $W$ over $\xi=0$ is a plane, freely parametrised by $(u,w)$, which is what a copy of $\C^3$ fibred over the $\xi$-line ought to look like.

Notice the shape of the argument:

$$
1-\eta=\xi u,
\qquad
C-1=\xi v,
\qquad
3u-2v=\xi w.
$$

Each step says that some quantity is forced to vanish on the collision fibre $\xi=0$, hence is divisible by $\xi$, and the quotient becomes a brand new free coordinate. Three divisibilities, three coordinates. The tangency of $H$ is what makes the vanishing happen at all.

## What goes wrong if you osculate

To see that the choice of hyperplane really was the crux, run the same construction with the osculating hyperplane

$$
H_{\mathrm{osc}}=\{Z_3=0\},
\qquad
Z_3\bigl(\delta(\lambda)\bigr)=-\lambda^3 .
$$

Its pullback under $\pi$ is

$$
Z_3\circ\pi=-sc.
$$

Deleting the zero set of $sc$ forces $s\neq0$ and $c\neq0$ separately, so now we can normalise $s=1$ and $c=1$ outright and we are left with free coordinates $(t,a,b)\in\C^3$. But we still have to delete the ramification locus, which in these coordinates reads

$$
\rho=as^2+bst+ct^2=a+bt+t^2 .
$$

So the source is

$$
\C^3\setminus\{a+bt+t^2=0\},
$$

which is not $\C^3$.

There is a specific reason it cannot be. On the complement of $\{f=0\}$ the function $1/f$ is a legitimate polynomial-type function, so $f$ has become invertible. But on $\C^3$ itself, the only polynomials with polynomial inverses are the nonzero constants: if $fg=1$ with $f,g$ polynomials then degrees force both to have degree $0$. Since $a+bt+t^2$ is not constant, the two spaces are not isomorphic.

Basically, tangency produces a single, first-order collision of the two deleted lines, which is exactly enough to generate the divisibilities; osculation makes the pullback factor into two separate pieces, and deleting both cuts a genuine hypersurface out of the source that no change of coordinates can repair.

## Reassembling the formula

We now have isomorphisms

$$
\C^3\xrightarrow{\ \alpha\ }X
\qquad\text{and}\qquad
Y\xrightarrow{\ \beta\ }\C^3,
$$

and in between the restriction $\pi|_X:X\to Y$. The composite

$$
F=\beta\circ\pi|_X\circ\alpha:\C^3\longrightarrow\C^3
$$

is a polynomial map, because each of the three pieces is given by polynomial formulas.

Concretely, on $Y$ use the affine coordinates

$$
\left(\frac{Z_0}{Z_2},\;-2\frac{Z_1}{Z_2},\;-2\frac{Z_3}{Z_2}\right).
$$

The factors of $-2$ are pure cosmetics, chosen so that the final answer matches the announced formula; composing with any invertible linear map of $\C^3$ gives an equally valid counterexample.

Since $[Z_0:Z_1:Z_2:Z_3]=[ta:tb-sa:h:-sc]$ and $\xi,\eta,A,B,C$ were built precisely to record $s,t,a,b,c$ divided by the right powers of $h$ and $\rho$, these three coordinates become

$$
\eta A,
\qquad
-2(\eta B-\xi A),
\qquad
2\xi C.
$$

Finally rename the source coordinates,

$$
x=\xi,\qquad y=-u,\qquad z=w,
$$

again only to make the signs come out nicely. Then the formulas from the previous section read

$$
\begin{aligned}
\eta&=1+xy,\\
C&=1-\tfrac32xy-\tfrac12x^2z,\\
B&=-\tfrac12\bigl(y+xz+3xy^2+x^2yz\bigr),\\
A&=z+4y^2+2xyz+3xy^3+x^2y^2z.
\end{aligned}
$$

For the first coordinate, group $A$ as

$$
A=(1+xy)^2z+y^2(4+3xy),
$$

so that

$$
\eta A=(1+xy)^3z+y^2(1+xy)(4+3xy)=P.
$$

The other two come out the same way, and the result is

$$
\begin{aligned}
P&=(1+xy)^3z+y^2(1+xy)(4+3xy),\\
Q&=y+3x(1+xy)^2z+3xy^2(4+3xy),\\
R&=2x-3x^2y-x^3z,
\end{aligned}
$$

which is exactly the map from the beginning.

### The three points

Return to the cubic with roots $\{0,2,-2\}$. Its three preimages under $\pi$ were

$$
\bigl(0,\{2,-2\}\bigr),\qquad
\bigl(2,\{0,-2\}\bigr),\qquad
\bigl(-2,\{0,2\}\bigr).
$$

Let us push the first one through the coordinate change. It is $p=[0:1]$ and $Q=U^2-4V^2$, so $(s,t;a,b,c)=(0,1;1,0,-4)$ and

$$
h=tc-sb=-4,
\qquad
\rho=as^2+bst+ct^2=-4,
$$

both nonzero, so the point lies in $X$. Normalising,

$$
\xi=\frac{sh}{\rho}=0,\quad
\eta=\frac{th}{\rho}=1,\quad
A=\frac{a\rho}{h^2}=-\tfrac14,\quad
B=0,\quad
C=1 .
$$

Then $u=A\xi+2B\eta=0$ and $w=A-4Bu-2u^2C=-\tfrac14$, so

$$
(x,y,z)=(\xi,-u,w)=\left(0,0,-\tfrac14\right).
$$

That is the first of the three points listed at the top of this post. Doing the same for the other two marked roots produces

$$
\left(1,-\tfrac32,\tfrac{13}{2}\right)
\qquad\text{and}\qquad
\left(-1,\tfrac32,\tfrac{13}{2}\right).
$$

(A quick check: the normalisation makes $[\xi:\eta]=[x:1+xy]$, and these two give $[1:-\tfrac12]=[-2:1]$ and $[-1:-\tfrac12]=[2:1]$, the marked roots $-2$ and $2$ as promised.)

Their common image is

$$
\left(\frac{Z_0}{Z_2},-2\frac{Z_1}{Z_2},-2\frac{Z_3}{Z_2}\right)
=\left(-\tfrac14,0,0\right),
$$

since the cubic $U^3-4UV^2$ has $Z_1=Z_3=0$. Which is the point we started with.

### Constancy of $\det DF$

There is no need to compute anything, and this is where the interlude on charts becomes useful once again.

We know that the derivative of $\pi$ degenerates nowhere on $X$, because $X$ was built by deleting exactly the locus where it degenerated. That fact was established in a chart chosen for convenience, one point of $\Pj^1$ at a time. But by the Lemma, degeneracy of the derivative is independent of the chart, so it holds just as well in the coordinates $(x,y,z)$ and $(Z_0/Z_2,-2Z_1/Z_2,-2Z_3/Z_2)$ that we actually ended up with. Spelled out, $F=\beta\circ\pi|_X\circ\alpha$ gives

$$
DF=D\beta\cdot D\pi\cdot D\alpha,
$$

where $\alpha$ and $\beta$ are invertible with polynomial inverses, so their derivatives are invertible matrices. A product of invertible matrices is invertible.

Hence $\det DF$ is a polynomial on $\C^3$ that vanishes nowhere.

Now, a nonconstant polynomial on $\C^n$ always has a zero. Pick a variable that actually appears, fix the other variables at values making its leading coefficient nonzero, and apply the fundamental theorem of algebra to the resulting one-variable polynomial. So $\det DF$ must be a nonzero constant. Evaluating at the convenient point $(0,0,0)$ gives the value $-2$. Therefore, this is indeed a counterexample to the Jacobian conjecture.
