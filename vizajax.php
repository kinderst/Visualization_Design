<?php
	if (isset($_POST["example"])) {
		if ($_POST["example"] == 1) {
			?>
				<div id="textcontent">
					<div id="intro" class="contentpanel">
						<h2>Example 1: Gram Stains Versus MIC of drugs</h3>
						<h3>Question: How do gram stained bacteria affect the MIC in each of the drugs</h2>
						<p>
							For this first example, there are three related plots. They each show the MIC of the three drugs
							on each bacteria, separated into two groups: positive and negative gram stained. The question
							is low level domain specifc: we are trying to analyze gram stained trends to know which
							would have the greatest effect on each of the drugs. We are also looking at statistical
							numbers in this box plot.
						</p>
						<p>
							What this chart shows is that for Penicilin, positive gram stained bacteria have a much higher 
							mean MIC than negative stained bacteria. 
							However, for the other two drugs (Streptomycin, Neomycin), the means for the two groups are the
							same! It is possible to see the means are the same because of the line in the middle of the box
							plot (which indicates mean) are the exact same for the two groups for the other two drugs. This is
							judged by position on common scale, as the mean bars of the both box plots line up exactly on the 
							y axis. The means are 0 for Streptomycin MIC two groups, and -2.30 for the Neomycin groups. 
						</p>
						<p>
							I chose the visualization type of a box plot with associated scatter plot because of a trend
							that I noticed initially in the data when I examined it. I saw the Penicilin relationship with 
							gram staining negative and very high MIC. This led me to ask if gram stained bacteria positive
							or negative had an impact on MIC for each of the drugs. I knew a box plot was a good idea because
							it would show group means, standard deviation, and range, which would be important for this use case. 
							This use would probably be used in a scientific report so these statistical symbols would give
							more detailed insight to this limited dataset. By using judgement of length, the viewer can
							determine which has a wider standard deviation and range.
						</p>
						<p>
							Color as well as clear grouping was used to separate the two groups on the plot. The blue values
							and boxplot on the left fairly clearly belong to the negative, and the orange on the right
							are the positive. We are easily able to distinguish these two groups with Gestalt principles
							of proximity and similarity in color. However, to conclude,
							one of the most important data transformations to make this visualization 
							posible was to do a log transformation of the MIC values for each drug. This allowed very 
							small valus like 0.001 to look relatively close to 1 and even the highest number, 
							870 (the log of 870 is 6.77, the log of 0.001 is -6.91).
						</p>
					</div>
				</div>
				<div id="graphone" class="contentpanel">
				</div>
				<div id="graphtwo" class="contentpanel">
				</div>
				<div id="graphthree" class="contentpanel">
				</div>
			<?php
		} else if ($_POST["example"] == 2) {
			?>
				<div id="textcontent">
					<div id="intro" class="contentpanel">
						<h2>Example 2: 3D plot of MIC of all three drugs</h2>
						<h3>
							Question: Are there any clusters or groups of bacteria that have similar levels of MIC
							of each drug?
						</h3>
						<p>
							For this second example, I created a 3 dimensional scatter plot of the MIC levels for each
							drug on the bacterias. This question would be considered a relatively high level abstract
							specific question because we aren't trying to do math so much as look for any sort of patterns.
							To do this, I again separated the positives and negatives into two groups by using
							color to differentiate between the groups.
						</p>
						<p>
							From this graph, we can clearly see that there are three distinct groups. One in the bottom left
							which consist of all negative gram stained bacteria, one in the top right consisting of all
							positive gram stained values, and one in the bottom far center which consists of both positive
							and negative gram stains. We are able to see this because of Gestalt Groupings of proximity
							where things that are close to eachother appear to be grouped together. We also have the color
							coding as similarity which I talked about earlier. I would have included the clustered group borders,
							but plotly wasn't being very friendly, so just pretend that is there.
						</p>
						<p>
							In terms of answering the question, I think this graph does a great job showing the relationship
							between the three variables. This is in part due to how well the data worked out, because the
							natural clusters exist. The default view of the graph given allows for relatively intuitive judgement
							of position on a common scale. The points in the cluster in the far back are a bit bunched
							together so it is hard to tell there (ie the expressiveness was lacking), but the jitter attribute 
							wasn't working for those points, so I didn't know how to fix that without log transforming.
							I didn't want to log transform the MIC to make the difference between 0.001 and 0.005 bigger, for
							example, because the natural data lended enough intuition into the patterns that already clearly
							existed. So, I sacrificed expressiveness for effectiveness, which I think was okay here
							because you can still tell there are three groups which answers the question, and is more
							accurate.
						</p>
						<p>
							*NOTE* When I tried to make this a static plot, it disappeared, so I left it interactive
						</p>
					</div>
				</div>
				<div id="graph" class="contentpanel">
				</div>
			<?php
		} else {
			?>
			<h2>Scatter Plot with sized points</h2>
			<h3>
				Question: If you were given a Streptomycin and Neomycin MIC for a given bacteria, could you predict
				what the Penicilin MIC for that bacteria would be?
			</h3>
			<p>
				To begin, I know that this question is very specific and a little suspect. However, I really
				wanted to experiment with different sized points on a scatter chart. Penicilin seemed like the best
				variable to use for a size coefficient because the range of that variable was the greatest. I also
				had to multiply penicilin MIC by 100,000, take the log of that, then multiply that log transform
				by 5 again. So, I know that really fudged the numbers and makes this sort of a psuedo representation
				of the true size/Penicilin, but I think the visualization turned out well and can say a bit about
				the data, which I will talk about below.
			</p>
			<p>
				The choice for visualization was chosen because of the reasons I stated above, but also because it allows
				for a two dimensional plot with an added third dimension of size of points, without having to draw a 3d
				plot as I did in my previous experiment. This allows us to better leverage the innate ability to judge
				position on common scale very well. So, we can judge the x and y coordinates of the points pretty well,
				but the main question is, can we predict a Penicilin MIC given the x, y coordinates. I would argue
				that this is possible, but not very easy. It's possible because clearly the bigger plotted points lie
				towards the middle and are negative gram stained. It's not very easy because A) we have to judge
				based on circle area or cirlce radius which is using our elementary perceptual task of area or length,
				which are good but not great. And B) because I transformed the Penicilin variable so much that the results
				aren't actually representative of the real data...but its close!
			</p>
			<p>
				In summary, this was a pretty good visualization, but not as good as the other two. As in all the others,
				I separated the two groups of positive and negative by color. As with the others as well, I leveraged
				our best elementary perceptual task of judging position on common scale in at least one way. However, 
				where this failed is in the sense that the crux of the question -- estimating a Penicilin value given
				the x, y coordinates (Streptomycin and Neomycin MIC) -- isn't very clear or easy, for the reasons mentioned
				at the end of the second paragraph. All in all, I think this graph turned out alright, but could have
				been done better, and I like my second example of representing these three dimensions better.
			</p>
			<div id="graph" class="contentpanel">
			</div>
			<?php
		}
	}
?>