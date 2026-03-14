import app from "./app";
import { hydrateFromGroupedSeed } from "./api/v1/repos/employeeHydrator";
import { groupedSeed } from "./api/v1/repos/seed";

hydrateFromGroupedSeed(groupedSeed);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});