---
title: "Some intuition for sheaf cohomology"
date: 2026-07-08
---

This post will be my attempt at an intuitive introduction to sheaf cohomology; I will assume basic knowledge of sheaf theory (see Vakil chapter 2).

Let us fix a space $X$, and consider sheaves of abelian groups on it (the rest of the discussion also works considering sheaves of $\mathcal{O}_X$ modules for any sheaf of rings $\mathcal{O}_X$, but we will restrict ourselves to abelian-group-valued sheaves to keep it simple). The basic goal that sheaf cohomology is trying to solve is extending global sections. We know that a short exact sequence of presheaves

$$
0 \to A \to B \to C \to 0
$$

is exact on the level of open sets; that is,

$$
0 \to A(U) \to B(U) \to C(U) \to 0
$$

is exact for every open $U \subseteq X$. This is because for any map between sheaves $A \xrightarrow{f} B$, $\ker(f(U))$ and $\coker(f(U))$ form presheaves, with obvious compatible restriction maps. If $A$ and $B$ are sheaves, then one can easily check that this presheaf kernel is also a sheaf. However, this does not hold for the presheaf cokernel. The notion of a cokernel in the category of presheaves still does exist, but to get it one has to sheafify the presheaf cokernel. Because we still have a notion of presheaf cokernel, it makes sense to talk about exact sequences of sheaves

$$
0 \to A \xrightarrow{\iota} B \xrightarrow{\pi} C \to 0
$$

But now, taking sections is only left exact:

$$
0 \to A(U) \xrightarrow{\iota(U)} B(U) \xrightarrow{\pi(U)} C(U)
$$

However, taking *stalks* is still exact, as sheafification preserves stalks; for any point $p \in X$, we have

$$
0 \to A_p \xrightarrow{\iota_p} B_p \xrightarrow{\pi_p} C_p \to 0
$$

So in some sense, an exact sequence of sheaves gives an exact sequence of local information (stalks), but this usually fails to compatibly give rise to an exact sequence of global information (sections). How can we measure the extent of the failure to give rise to global sections? To simplify our discussion, let's focus on global sections. Take some $c \in C(X)$; we want to measure the obstruction to solving $c = \pi(b)$. We know that at each point $c_p = \pi_p(b_p)$, so there exists some open cover $\{U_i\}_i$, $\cup_i U_i = X$ and $b_i \in B(U_i)$ such that $c\vert_{U_i} = \pi(b_i)$ (from now on, I will drop the $U$ argument of maps between sheaves like $\pi/\iota$ when it is obvious). If we could choose the $b$'s such that $b_i\vert_{U_j} = b_j\vert_{U_i}$, then by the sheaf axioms we could glue this into a global section $b \in B(X)$ s.t. $\pi(b) = c$. We can't necessarily do this, but we *almost* have this from the fact that $\pi(b_i\vert_{U_j}) = \pi(b_j\vert_{U_i}) = c\vert_{U_i \cap U_j}$, so $b_i\vert_{U_j} - b_j\vert_{U_i}$ isn't necessarily zero, but it *does* necessarily lie in $\ker(\pi(U_i \cap U_j)) = \im(\iota(U_i \cap U_j))$, so can be written as $\iota(a_{ij})$. It is then straightforward to check that $a_{ij} + a_{jk} + a_{ki} = 0$, that different choices of $b$'s simply give $a'_i$ s.t. $a_{ij} \mapsto a_{ij} + a'_i - a'_j$, and that $\pi(b) = c$ can only be solved if we can choose the $a_{ij}$'s to be zero. This gives us a space only dependent on $A$, that we will call $H^1(X, A)$, and a map $C(X) \to H^1(X, A)$, such that $c \mapsto 0$ if and only if $\exists\, b \in B(X)$ with $\pi(b) = c$; in other words, our left exact sequence extends to a sequence

$$
0 \to A(X) \to B(X) \to C(X) \to H^1(X, A)
$$

that is exact.

We can similarly construct $H^1(X, B)$ and $H^1(X, C)$ and maps extending the exact sequence further, then characterize the failure of surjectivity of $H^1(X, B)$ onto $H^1(X, C)$ via an $H^2(X, A)$, and so on and so forth. Computationally characterizing these groups the same way we did for $H^1(X, A)$ basically gets us to Čech cohomology. However, instead of that, I want to take a step back. This idea of characterizing failures of right exactness has brought us to a long exact sequence

$$
0 \to A \to B \to C \to H^1(X, A) \to H^1(X, B) \to H^1(X, C) \to H^2(X, A) \to \dots
$$

If we know, morally, that we should have such a long exact sequence, can we use that to more easily computationally determine what it should be by embedding a sheaf into a nicer one? If $I$ is a sheaf such that any short exact $0 \to I \to B \to C \to 0$ leads to a short exact sequence of global sections $0 \to I(X) \to B(X) \to C(X) \to 0$, then the idea is that $I$ makes it so that there can be no obstruction to surjectivity. Intuitively, then, $H^{k \geq 1}(X, I)$ should simply be $0$, as $I$ forces any exact sequence to remain exact under taking global sections. There is a nice class of sheaves satisfying this property for *any* left exact functor — the injective sheaves — and every sheaf embeds into an injective sheaf. So, let us fix some sheaf $A^0$ (the reason for the superscript will become apparent soon), and, taking cokernel, we have the exact sequence

$$
0 \to A^0 \to I^0 \xrightarrow{d^0} A^1 \to 0
$$

The long exact sequence from earlier then gives us

$$
0 \to A^0(X) \to I^0(X) \to A^1(X) \to H^1(X, A^0) \to H^1(X, I^0) = 0
$$

which means that $H^1(X, A^0) \cong A^1(X)/\im(I^0(X))$. We also have from the long exact sequence that, for $k \geq 1$,

$$
H^k(X, I^0) = 0 \to H^k(X, A^1) \to H^{k+1}(X, A^0) \to H^{k+1}(X, I^0) = 0
$$

meaning that $H^k(X, A^1) \cong H^{k+1}(X, A^0)$, giving us a "dimension shift". From here it is clear what we need to do — we can repeat this process for $A^1$, embedding it into some $I^1$, then taking the quotient to get $A^2$, and so on and so forth. We have $H^k(X, A^0) \cong H^1(X, A^{k-1}) \cong A^k(X)/\im(I^{k-1}(X))$.

Using the embeddings to identify $A^i$ as a subsheaf of $I^i$, and defining the composite $I^{i-1} \twoheadrightarrow A^i \hookrightarrow I^i$ as $d^{i-1}$, this construction gives us an exact sequence

$$
0 \to A^0 \to I^0 \xrightarrow{d^0} I^1 \to \dots
$$

(the higher $A^i$'s are suppressed, but can simply be identified by $A^i = \ker(d^i)$), with

$$
H^k(X, A^0) \cong A^k(X)/\im(I^{k-1}(X)) \cong \ker(d^k(X))/\im(d^{k-1}(X)).
$$

Once you take this as a definition of cohomology there is a lot of work in establishing that it has nice properties (well-defined independent of choice of injective sheaves, showing that a map $A \to B$ induces a map between cohomology groups, actually verifying the long exact sequence of cohomology for an arbitrary short exact sequence of sheaves, etc.), but it is fairly straightforward, and hopefully this blog post gave you some intuition for where this definition comes from. Furthermore, this construction generalizes: rather than considering only the functor which takes a sheaf to its global sections, we can consider any left exact functor and any abelian category where every object injects into an injective, and this very same construction gives the definition of a (right) derived functor! Sheaf cohomology can then be seen as a special case of a derived functor — the right derived functor of the global sections functor.
