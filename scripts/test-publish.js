#!/usr/bin/env node

/**
 * Test script for GitHub Packages configuration
 * Run this to verify your setup before publishing
 */

import { execSync } from 'child_process';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

console.log('🔍 Testing GitHub Packages Configuration...\n');

// Check if .npmrc exists
const npmrcPath = join(rootDir, '.npmrc');
if (!existsSync(npmrcPath)) {
  console.error('❌ .npmrc file not found!');
  console.log('Create .npmrc with:');
  console.log('@frndfrts:registry=https://npm.pkg.github.com');
  console.log('//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}');
  process.exit(1);
}

// Check package.json configuration
const packageJsonPath = join(rootDir, 'package.json');
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));

console.log('📦 Package Configuration:');
console.log(`   Name: ${packageJson.name}`);
console.log(`   Version: ${packageJson.version}`);
console.log(`   Repository: ${packageJson.repository?.url}`);
console.log(`   Publish Config: ${packageJson.publishConfig?.registry}`);

// Validate package name format
if (!packageJson.name.startsWith('@frndfrts/')) {
  console.error('❌ Package name must start with @frndfrts/');
  process.exit(1);
}

// Validate repository URL
if (!packageJson.repository?.url?.includes('github:frndfrts/')) {
  console.error('❌ Repository URL must be github:frndfrts/fluent-ui-custom-components');
  process.exit(1);
}

// Validate publish config
if (packageJson.publishConfig?.registry !== 'https://npm.pkg.github.com') {
  console.error('❌ Publish registry must be https://npm.pkg.github.com');
  process.exit(1);
}

console.log('✅ Package configuration is valid!\n');

// Check if dist directory exists
const distPath = join(rootDir, 'dist');
if (!existsSync(distPath)) {
  console.log('📁 Building package...');
  try {
    execSync('npm run build:all', { cwd: rootDir, stdio: 'inherit' });
    console.log('✅ Build completed successfully!\n');
  } catch (error) {
    console.error('❌ Build failed!');
    process.exit(1);
  }
} else {
  console.log('✅ Build directory exists\n');
}

// Check npm configuration
console.log('🔧 Checking npm configuration...');
try {
  const npmConfig = execSync('npm config list', { encoding: 'utf8' });
  
  if (npmConfig.includes('@frndfrts:registry = "https://npm.pkg.github.com"') || npmConfig.includes('@frndfrts:registry="https://npm.pkg.github.com"')) {
    console.log('✅ Personal account registry configured');
  } else {
    console.log('⚠️  Personal account registry not configured');
    console.log('Run: npm config set @frndfrts:registry https://npm.pkg.github.com');
  }
  
  if (npmConfig.includes('//npm.pkg.github.com/:_authToken=')) {
    console.log('✅ GitHub token configured');
  } else {
    console.log('⚠️  GitHub token not configured');
    console.log('Set GITHUB_TOKEN environment variable');
  }
} catch (error) {
  console.error('❌ Failed to check npm configuration');
}

console.log('\n🎯 Ready to publish!');
console.log('\nNext steps:');
console.log('1. Set GITHUB_TOKEN environment variable');
console.log('2. Run: npm login --scope=@frndfrts --registry=https://npm.pkg.github.com');
console.log('3. Run: npm publish');
console.log('\nOr create a GitHub release to trigger automated publishing!');
