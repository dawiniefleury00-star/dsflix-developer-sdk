// DSFlix SDK — Basic Usage Example
// Run: node dist/examples/basic.js (after npm run build)

import { DsfClient, DsfError } from '../index';

const dsf = new DsfClient({
  apiKey: process.env.DSF_API_KEY || 'dfx-your-key-here',
});

async function main() {
  console.log('=== DSFlix SDK Basic Example ===\n');

  try {
    // 1. Popular movies
    console.log('📽️  Fetching popular movies...');
    const popular = await dsf.movies.getPopular({ page: 1 });
    console.log(`Found ${popular.total_results} movies`);
    console.log('Top 3:');
    popular.results.slice(0, 3).forEach((m, i) => {
      console.log(`  ${i + 1}. ${m.title} (${m.release_date?.split('-')[0]}) ⭐ ${m.vote_average}`);
    });

    // 2. Search
    console.log('\n🔍 Searching for "Inception"...');
    const search = await dsf.search.movies('Inception');
    console.log(`Found ${search.total_results} results`);
    if (search.results[0]) {
      console.log(`Top result: ${search.results[0].title} (${search.results[0].release_date?.split('-')[0]})`);
    }

    // 3. Movie details
    if (search.results[0]) {
      console.log('\n🎬 Fetching movie details...');
      const details = await dsf.movies.getDetails(search.results[0].id, {
        append_to_response: 'credits',
      });
      console.log(`Title: ${details.title}`);
      console.log(`Tagline: "${details.tagline}"`);
      console.log(`Runtime: ${details.runtime} minutes`);
      console.log(`Director: ${details.credits?.crew.find(c => c.job === 'Director')?.name}`);
      console.log(`Lead Actor: ${details.credits?.cast[0]?.name} as ${details.credits?.cast[0]?.character}`);
    }

    // 4. Trending TV
    console.log('\n📺 Trending TV shows...');
    const tvTrending = await dsf.tv.getPopular();
    console.log(`Top show: ${tvTrending.results[0]?.name}`);

    // 5. Membership plans
    console.log('\n💎 Available membership plans:');
    const { plans } = await dsf.membership.getPlans();
    plans.forEach(plan => {
      console.log(`  ${plan.name} — $${plan.price_monthly}/mo`);
    });

    console.log('\n✅ All examples completed!');

  } catch (err) {
    if (err instanceof DsfError) {
      console.error(`\n❌ DSFlix API Error [${err.statusCode}]: ${err.message}`);
      if (err.statusCode === 401) {
        console.error('Make sure your API key is valid and starts with "dfx-"');
        console.error('Get a key at: https://dawensflix.com/api-dashboard');
      }
    } else {
      console.error('Unexpected error:', err);
    }
  }
}

main();
