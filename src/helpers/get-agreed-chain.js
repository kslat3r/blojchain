module.exports = (chains) => {
  const buckets = {};

  chains.forEach((blocks) => {
    blocks.forEach((block) => {
      if (!buckets[block.index]) {
        // index does not yet have a bucket

        block.count = 1;

        buckets[block.index] = [block]
      } else if (buckets[block.index]) {
        // index has a bucket

        // get the block index key from the bucket

        const foundBlockIndex = buckets[block.index].findIndex((depositedBlock) => {
          return depositedBlock.index === block.index
            && depositedBlock.prevHash === block.prevHash
            && depositedBlock.data === block.data
            && depositedBlock.nonce === block.nonce
            && depositedBlock.hash === block.hash;
        });

        if (foundBlockIndex !== -1) {
          // if found, increment the count

          buckets[block.index].count++;
        } else {
          // not found, add to the bucket for this index

          block.count = 1;

          buckets[block.index].push(block);
        }
      }
    });
  });

  // get the agreed chain based on count of blocks

  const agreedChain = [];

  Object.keys(buckets).forEach((index) => {
    let largestCount = 0;
    let agreedBlock;

    buckets[index].forEach((block) => {
      // is this block the consensus?

      if (block.count > largestCount) {
        largestCount = block.count;
        agreedBlock = block;
      }
    });

    agreedChain.push(agreedBlock);
  });

  return agreedChain.sort((a, b) => a.index - b.index);
};
