#!/bin/bash

BASE_DIR="./Problems"

# Step 1: Category
echo "Select Category:"
select category in $(ls "$BASE_DIR"); do
  [ -n "$category" ] && break
  echo "Invalid selection"
done

CATEGORY_PATH="$BASE_DIR/$category"

# Step 2: Difficulty
echo "Select Difficulty:"
select difficulty in easy medium hard; do
  if [ -d "$CATEGORY_PATH/$difficulty" ]; then
    break
  else
    echo "Invalid selection"
  fi
done

DIFF_PATH="$CATEGORY_PATH/$difficulty"

# Step 3: Problem
# -------------------------------------------------------
# Select Problem from Directory (Clean UI Display Version)
# -------------------------------------------------------
# - options[]  -> stores full folder paths (used for execution)
# - names[]    -> stores only folder names (used for UI display)
# - select     -> shows clean numbered menu
# - REPLY      -> maps user choice back to actual path
# -------------------------------------------------------
# Get full paths of all problem folders
options=("$DIFF_PATH"/*/)

# Check if any folders exist
if [ ${#options[@]} -eq 0 ]; then
  echo "No problems found in $DIFF_PATH"
  exit 1
fi

# Build display names (only folder name, no full path)
names=()
for path in "${options[@]}"; do
  names+=("$(basename "$path")")
done
# Show menu
echo "Select Problem:"
select name in "${names[@]}"; do
  # Validate selection
  if [ -n "$name" ]; then
    # Map selected index back to full path
    problem_path="${options[$((REPLY-1))]}"
    break
  else
    echo "Invalid selection"
  fi
done

# Final selected folder name (clean)
problem=$(basename "$problem_path")

FOLDER_PATH="$DIFF_PATH/$problem"

# Step 4: Check
if [ ! -f "$FOLDER_PATH/index.ts" ]; then
  echo "index.ts not found"
  exit 1
fi

# Step 5: Compile TypeScript
tsc "$FOLDER_PATH/index.ts" --outDir "$FOLDER_PATH/dist" --ignoreConfig
#  --declaration \
#  --sourceMap \
#  --declarationMap \


# Step 6: Check if compilation succeeded
if [ $? -ne 0 ]; then
  echo "TypeScript compilation failed"
  exit 1
fi

# Step 7: Run the compiled file
node "$FOLDER_PATH/dist/index.js"